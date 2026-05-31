#!/usr/bin/env python3
"""Convert hardcoded cross-site URLs to Jinja2 macro variables.

Replaces:
  https://docs.mat3ra.com/guide/...  → {{ guide_url }}/...
  https://docs.mat3ra.com/reference/... → {{ reference_url }}/...
  https://docs.mat3ra.com/dev/...    → {{ dev_url }}/...

Also adds 'render_macros: false' front matter to files that contain
raw Jinja2 template syntax ({{ input.X }}, etc.) to prevent them from
being processed by the macros plugin.

Usage:
    python scripts/urls-to-macros.py --dry-run   # preview
    python scripts/urls-to-macros.py --apply      # rewrite files
"""

import argparse
import re
import sys
from pathlib import Path

DOCS_DIR = Path("lang/en/docs")

# Map from absolute URL base to Jinja2 variable name
URL_MAP = {
    "https://docs.mat3ra.com/guide": "guide_url",
    "https://docs.mat3ra.com/reference": "reference_url",
    "https://docs.mat3ra.com/dev": "dev_url",
}

# Files with raw Jinja2 syntax that must NOT have macros enabled
JINJA_FILES = {
    "benchmarks/2018-11-12-comparison.md",
    "workflows/templating/examples.md",
    "workflows/templating/exabyte-convention.md",
    "workflows/templating/jinja.md",
    "workflows/templating/swig.md",
}


def replace_urls_with_macros(content: str) -> tuple[str, int]:
    """Replace hardcoded cross-site URLs with Jinja2 variables.

    Returns (new_content, replacement_count).
    """
    count = 0
    for url_base, var_name in URL_MAP.items():
        # Match the URL base followed by / in markdown links
        # e.g., (https://docs.mat3ra.com/reference/accounts/balance/)
        pattern = re.escape(url_base) + r"/"
        replacement = "{{ " + var_name + " }}/"
        new_content, n = re.subn(pattern, replacement, content)
        content = new_content
        count += n
    return content, count


def add_render_macros_false(content: str) -> str:
    """Add render_macros: false front matter if not already present."""
    if "render_macros:" in content:
        return content

    if content.startswith("---\n"):
        # Has existing front matter — add to it
        end = content.index("---\n", 4)
        return content[:end] + "render_macros: false\n" + content[end:]
    else:
        # No front matter — add new block
        return "---\nrender_macros: false\n---\n\n" + content


def main():
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--dry-run", action="store_true")
    group.add_argument("--apply", action="store_true")
    args = parser.parse_args()

    url_replacements = 0
    url_files = 0
    jinja_protected = 0

    # Pass 1: Replace URLs with macros
    for md_file in sorted(DOCS_DIR.rglob("*.md")):
        rel = str(md_file.relative_to(DOCS_DIR))
        if rel.startswith("includes/"):
            continue

        try:
            content = md_file.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue

        new_content, count = replace_urls_with_macros(content)

        if count > 0:
            url_replacements += count
            url_files += 1
            if args.apply:
                md_file.write_text(new_content, encoding="utf-8")
            print(f"  {rel}: {count} URL(s) → macros")

    # Pass 2: Protect Jinja files
    for rel_path in sorted(JINJA_FILES):
        md_file = DOCS_DIR / rel_path
        if not md_file.exists():
            continue

        content = md_file.read_text(encoding="utf-8")
        new_content = add_render_macros_false(content)

        if new_content != content:
            jinja_protected += 1
            if args.apply:
                md_file.write_text(new_content, encoding="utf-8")
            print(f"  {rel_path}: added render_macros: false")

    mode = "DRY RUN" if args.dry_run else "APPLIED"
    print(f"\n# {mode}: {url_replacements} URLs in {url_files} files, "
          f"{jinja_protected} files protected with render_macros: false",
          file=sys.stderr)


if __name__ == "__main__":
    main()
