#!/usr/bin/env python3
"""
Fix remaining broken relative links in Markdown source files.

For each subsite, finds relative Markdown links that point to pages excluded
from that subsite and converts them to cross-site macro URLs.

Usage:
    python scripts/fix-broken-cross-links.py --dry-run
    python scripts/fix-broken-cross-links.py --apply
"""
import os
import re
import sys
import yaml

DOCS_DIR = "lang/en/docs"

def load_exclude_patterns(config_file):
    """Extract exclude_docs patterns from a mkdocs config using regex (avoids YAML tag issues)."""
    with open(config_file) as f:
        text = f.read()
    # Find the exclude_docs block. It's a YAML block scalar that continues until
    # a line at the same indent level as exclude_docs (i.e., no leading whitespace).
    m = re.search(r'^exclude_docs:\s*\|\s*\n((?:(?:[ \t]+.*|[ \t]*)\n)*)', text, re.MULTILINE)
    if not m:
        return []
    patterns = []
    for line in m.group(1).splitlines():
        line = line.strip()
        if line and not line.startswith("#"):
            patterns.append(line)
    return patterns

def is_excluded(rel_path, patterns):
    """Check if a relative doc path matches any exclude pattern."""
    for pat in patterns:
        if pat.endswith("/"):
            if rel_path.startswith(pat) or rel_path.startswith(pat.rstrip("/")):
                return True
        else:
            if rel_path == pat:
                return True
    return False

def find_target_site(rel_path, site_configs):
    """Given a doc-relative path, find which subsite includes it."""
    for site_name, (config_file, url_var) in site_configs.items():
        patterns = load_exclude_patterns(config_file)
        if not is_excluded(rel_path, patterns):
            return site_name, url_var
    return None, None

def process_file(md_path, doc_rel_path, own_excludes, site_configs, apply=False):
    """Process a single Markdown file, fixing broken relative links."""
    with open(md_path) as f:
        content = f.read()

    changes = []
    new_content = content

    # Find Markdown links: [text](relative/path.md) or [text](../relative/path.md)
    # Also handles multi-line links where the URL is on the next line after ](
    link_pattern = re.compile(r'\[([^\]]*)\]\(\s*(\.\./[^)#\s]+(?:\.md)?)(#[^)]*)?\)')

    for m in link_pattern.finditer(content):
        link_text = m.group(1)
        link_path = m.group(2)
        anchor = m.group(3) or ""

        # Resolve the target path relative to the current file's directory
        file_dir = os.path.dirname(os.path.join(DOCS_DIR, doc_rel_path))
        resolved = os.path.normpath(os.path.join(file_dir, link_path))

        # Convert to doc-relative path
        if resolved.startswith(DOCS_DIR + "/"):
            target_rel = resolved[len(DOCS_DIR) + 1:]
        else:
            continue

        # Remove .md extension for path matching
        target_rel_noext = target_rel.replace(".md", "")

        # Check if this target is excluded from the current site
        if not is_excluded(target_rel, own_excludes) and not is_excluded(target_rel_noext + "/", own_excludes):
            continue  # Link is fine, target exists in this site

        # Find which site has this page
        target_site, url_var = find_target_site(target_rel, site_configs)
        if not url_var:
            continue

        # Build the new URL
        target_url_path = target_rel_noext.rstrip("/") + "/"
        new_link = f"[{link_text}]({{{{ {url_var} }}}}/{target_url_path}{anchor})"
        old_link = m.group(0)

        if old_link != new_link:
            changes.append((old_link, new_link))
            new_content = new_content.replace(old_link, new_link, 1)

    if changes and apply:
        with open(md_path, "w") as f:
            f.write(new_content)

    return changes

def main():
    apply = "--apply" in sys.argv
    dry_run = "--dry-run" in sys.argv or not apply

    # Site configs: name -> (config_file, url_variable)
    site_configs = {
        "guide": ("mkdocs-guide.yml", "guide_url"),
        "reference": ("mkdocs-concepts.yml", "reference_url"),
        "dev": ("mkdocs-dev.yml", "dev_url"),
    }

    total_fixes = 0
    total_files = 0

    for site_name, (config_file, url_var) in site_configs.items():
        own_excludes = load_exclude_patterns(config_file)

        # Find all .md files in docs dir
        for root, dirs, files in os.walk(DOCS_DIR):
            for fname in files:
                if not fname.endswith(".md"):
                    continue
                md_path = os.path.join(root, fname)
                doc_rel = os.path.relpath(md_path, DOCS_DIR)

                # Skip files excluded from this site
                if is_excluded(doc_rel, own_excludes):
                    continue

                changes = process_file(md_path, doc_rel, own_excludes, site_configs, apply=apply)
                if changes:
                    total_files += 1
                    total_fixes += len(changes)
                    if dry_run:
                        print(f"\n{doc_rel} ({site_name}):")
                        for old, new in changes:
                            print(f"  - {old}")
                            print(f"  + {new}")

    action = "Fixed" if apply else "Would fix"
    print(f"\n{action} {total_fixes} links in {total_files} files")

if __name__ == "__main__":
    main()
