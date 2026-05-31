#!/usr/bin/env python3
"""Find relative links in Markdown files that cross site boundaries.

For each page in a given site config, resolves all relative .md links
and checks if the target belongs to a different site.

Output: CSV lines with source_site, source_file, target_file, target_site, link_text
"""

import re
import os
import sys
from pathlib import Path

DOCS_DIR = Path("lang/en/docs")

def load_pages(config_path):
    """Extract .md page paths from a mkdocs config file."""
    pages = set()
    with open(config_path) as f:
        for line in f:
            # Match lines like:  - Something: path/to/file.md
            m = re.search(r':\s+(\S+\.md)\s*$', line)
            if m:
                pages.add(m.group(1))
    return pages

def resolve_link(source_md, rel_link):
    """Resolve a relative link from source_md to get the target path."""
    # Strip anchor
    rel_link = rel_link.split('#')[0]
    if not rel_link:
        return None
    # Resolve relative to source directory
    source_dir = Path(source_md).parent
    target = (source_dir / rel_link).resolve()
    docs_abs = DOCS_DIR.resolve()
    try:
        return str(target.relative_to(docs_abs))
    except ValueError:
        return None

def find_links_in_file(filepath):
    """Find all markdown links in a file, return list of (link_text, rel_path)."""
    links = []
    try:
        with open(filepath, encoding='utf-8') as f:
            content = f.read()
    except (UnicodeDecodeError, FileNotFoundError):
        return links

    # Match [text](path.md) and [text](path.md#anchor)
    for m in re.finditer(r'\[([^\]]*)\]\(([^)]*\.md(?:#[^)]*)?)\)', content):
        link_text = m.group(1)
        link_path = m.group(2)
        # Skip absolute URLs
        if link_path.startswith('http'):
            continue
        links.append((link_text, link_path))
    return links

def main():
    configs = {
        'guide': 'mkdocs-guide.yml',
        'concepts': 'mkdocs-concepts.yml',
        'dev': 'mkdocs-dev.yml',
    }

    site_pages = {}
    for name, cfg in configs.items():
        site_pages[name] = load_pages(cfg)

    def which_site(page_path):
        """Return which site(s) a page belongs to."""
        for name, pages in site_pages.items():
            if page_path in pages:
                return name
        return 'none'

    print("source_site,source_file,link_text,raw_link,resolved_target,target_site")

    cross_count = 0
    for site_name, pages in site_pages.items():
        for page in sorted(pages):
            filepath = DOCS_DIR / page
            if not filepath.exists():
                continue
            links = find_links_in_file(filepath)
            for link_text, raw_link in links:
                resolved = resolve_link(page, raw_link)
                if resolved is None:
                    continue
                target_site = which_site(resolved)
                if target_site != site_name and target_site != 'none':
                    cross_count += 1
                    # Escape commas in link text
                    safe_text = link_text.replace(',', ';')
                    print(f"{site_name},{page},{safe_text},{raw_link},{resolved},{target_site}")

    print(f"\n# Total cross-site links: {cross_count}", file=sys.stderr)

if __name__ == '__main__':
    main()
