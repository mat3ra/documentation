#!/usr/bin/env python3
"""Rewrite cross-site relative links to absolute URLs.

For each page in a site config, finds all relative .md links that point to
pages belonging to a different site and rewrites them as absolute URLs.

Usage:
    python scripts/rewrite-cross-site-links.py --dry-run   # preview only
    python scripts/rewrite-cross-site-links.py --apply      # rewrite files
"""

import argparse
import csv
import re
import sys
from pathlib import Path

DOCS_DIR = Path("lang/en/docs")

# Site configs and their production base URLs
SITES = {
    "guide": {
        "config": "mkdocs-guide.yml",
        "base_url": "https://docs.mat3ra.com/guide",
    },
    "concepts": {
        "config": "mkdocs-concepts.yml",
        "base_url": "https://docs.mat3ra.com/reference",
    },
    "dev": {
        "config": "mkdocs-dev.yml",
        "base_url": "https://docs.mat3ra.com/dev",
    },
}


def load_pages(config_path: str) -> set[str]:
    """Extract .md page paths from a mkdocs config file."""
    pages = set()
    with open(config_path) as f:
        for line in f:
            m = re.search(r":\s+(\S+\.md)\s*$", line)
            if m:
                pages.add(m.group(1))
    return pages


def resolve_relative(source_page: str, rel_link: str) -> str | None:
    """Resolve a relative link from source_page to a normalized page path.

    Returns the resolved page path (e.g. 'accounts/balance.md') or None.
    """
    # Strip anchor
    clean = rel_link.split("#")[0]
    if not clean:
        return None

    source_dir = Path(source_page).parent
    raw = (source_dir / clean).as_posix()

    # Normalize ../ components
    parts: list[str] = []
    for p in raw.split("/"):
        if p == "..":
            if parts:
                parts.pop()
        elif p != ".":
            parts.append(p)

    return "/".join(parts)


def page_to_url(page_path: str, base_url: str, anchor: str = "") -> str:
    """Convert a page path like 'accounts/balance.md' to an absolute URL.

    Result: https://docs.mat3ra.com/reference/accounts/balance/
    """
    # Strip .md, add trailing /
    url_path = page_path.removesuffix(".md")
    # Handle index pages
    if url_path.endswith("/index"):
        url_path = url_path.removesuffix("/index")

    url = f"{base_url}/{url_path}/"
    if anchor:
        url += f"#{anchor}"
    return url


def find_and_rewrite(content: str, source_page: str, source_site: str,
                     page_to_site: dict, rewrites: list) -> str:
    """Find all cross-site links in content and rewrite them.

    Returns the modified content and appends rewrite records to `rewrites`.
    """
    # Pattern: [text](path.md) or [text](path.md#anchor)
    link_re = re.compile(r"(\[[^\]]*\])\(([^)]*\.md(?:#[^)]*)?)\)")

    def replace_link(m: re.Match) -> str:
        link_text_bracket = m.group(1)  # e.g. [some text]
        full_ref = m.group(2)           # e.g. ../balance.md#section

        # Skip absolute URLs
        if full_ref.startswith("http"):
            return m.group(0)

        # Split anchor
        if "#" in full_ref:
            path_part, anchor = full_ref.split("#", 1)
        else:
            path_part, anchor = full_ref, ""

        resolved = resolve_relative(source_page, path_part)
        if resolved is None:
            return m.group(0)

        target_site = page_to_site.get(resolved)
        if target_site is None or target_site == source_site:
            return m.group(0)

        # Build absolute URL
        target_base = SITES[target_site]["base_url"]
        abs_url = page_to_url(resolved, target_base, anchor)

        rewrites.append({
            "source_site": source_site,
            "source_file": source_page,
            "link_text": link_text_bracket[1:-1],  # strip brackets
            "original_link": full_ref,
            "resolved_target": resolved,
            "target_site": target_site,
            "new_url": abs_url,
        })

        return f"{link_text_bracket}({abs_url})"

    return link_re.sub(replace_link, content)


def main():
    parser = argparse.ArgumentParser(description="Rewrite cross-site links")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--dry-run", action="store_true",
                       help="Preview rewrites without modifying files")
    group.add_argument("--apply", action="store_true",
                       help="Apply rewrites to files in-place")
    args = parser.parse_args()

    # Build ownership map: page_path -> site_name
    page_to_site: dict[str, str] = {}
    site_pages: dict[str, set[str]] = {}

    for site_name, cfg in SITES.items():
        pages = load_pages(cfg["config"])
        site_pages[site_name] = pages
        for page in pages:
            # If a page appears in multiple sites, first writer wins
            if page not in page_to_site:
                page_to_site[page] = site_name

    all_rewrites: list[dict] = []
    files_modified = 0

    for site_name, pages in site_pages.items():
        for page in sorted(pages):
            filepath = DOCS_DIR / page
            if not filepath.exists():
                continue

            try:
                content = filepath.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                continue

            rewrites: list[dict] = []
            new_content = find_and_rewrite(
                content, page, site_name, page_to_site, rewrites
            )

            if rewrites:
                all_rewrites.extend(rewrites)
                if args.apply:
                    filepath.write_text(new_content, encoding="utf-8")
                files_modified += 1

    # Write CSV report
    writer = csv.DictWriter(
        sys.stdout,
        fieldnames=[
            "source_site", "source_file", "link_text",
            "original_link", "resolved_target", "target_site", "new_url",
        ],
    )
    writer.writeheader()
    for row in all_rewrites:
        writer.writerow(row)

    mode = "DRY RUN" if args.dry_run else "APPLIED"
    print(f"\n# {mode}: {len(all_rewrites)} links in {files_modified} files",
          file=sys.stderr)


if __name__ == "__main__":
    main()
