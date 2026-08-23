#!/usr/bin/env python3
"""Post-build internal link checker for the multi-site documentation.

Scans the built site/ directory for all HTML files, extracts internal
<a href> links, and verifies that the target files exist on disk.

Usage:
    python scripts/check-links.py [site_dir]

Defaults to site_dir = "site".
Exit code 1 if any broken links are found.
"""

import os
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse


class LinkExtractor(HTMLParser):
    """Extract href attributes from <a> tags."""

    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            for name, value in attrs:
                if name == "href" and value:
                    self.links.append(value)


def resolve_link(html_file: Path, href: str, site_root: Path) -> Path | None:
    """Resolve an href to an absolute filesystem path within the site.

    Returns None if the link is external, a mailto, anchor-only, or
    uses a scheme we don't check.
    """
    # Skip external links, anchors, mailto, javascript, etc.
    if href.startswith(("#", "mailto:", "javascript:", "tel:", "data:")):
        return None

    parsed = urlparse(href)

    # Skip external URLs
    if parsed.scheme in ("http", "https", "ftp"):
        return None

    # Strip fragment
    path = unquote(parsed.path)
    if not path:
        return None

    # Absolute path (starts with /) — resolve from site root
    if path.startswith("/"):
        resolved = site_root / path.lstrip("/")
    else:
        # Relative path — resolve from the directory of the current file
        resolved = html_file.parent / path

    return resolved.resolve()


def check_path_exists(target: Path, site_root: Path) -> bool:
    """Check if a link target resolves to an existing file.

    Handles directory links (expecting index.html inside) and direct
    file links.
    """
    if target.is_file():
        return True
    if target.is_dir() and (target / "index.html").is_file():
        return True
    # Try adding .html
    html_target = target.with_suffix(".html")
    if html_target.is_file():
        return True
    # Try as directory with index.html (for paths without trailing slash)
    if (target / "index.html").is_file():
        return True
    return False


def main():
    site_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("site")

    if not site_dir.is_dir():
        print(f"Error: site directory '{site_dir}' not found.")
        print("Run the build first: ./scripts/serve-all.sh --build")
        sys.exit(2)

    site_root = site_dir.resolve()
    broken = []
    checked = 0

    html_files = sorted(site_root.rglob("*.html"))
    print(f"Scanning {len(html_files)} HTML files in {site_dir}/...")

    for html_file in html_files:
        with open(html_file, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()

        extractor = LinkExtractor()
        try:
            extractor.feed(content)
        except Exception:
            continue

        for href in extractor.links:
            target = resolve_link(html_file, href, site_root)
            if target is None:
                continue

            checked += 1

            # Only check links that should be inside the site
            try:
                target.relative_to(site_root)
            except ValueError:
                # Link points outside the site directory — skip
                continue

            if not check_path_exists(target, site_root):
                rel_source = html_file.relative_to(site_root)
                broken.append((str(rel_source), href))

    # Deduplicate
    broken = sorted(set(broken))

    print(f"Checked {checked} internal links.")
    print()

    if broken:
        print(f"BROKEN LINKS FOUND: {len(broken)}")
        print("=" * 60)

        # Group by source file
        by_source = {}
        for source, href in broken:
            by_source.setdefault(source, []).append(href)

        for source in sorted(by_source):
            print(f"\n  {source}:")
            for href in sorted(by_source[source]):
                print(f"    → {href}")

        print()
        print(f"Total: {len(broken)} broken link(s) in {len(by_source)} file(s).")
        sys.exit(1)
    else:
        print("No broken internal links found.")
        sys.exit(0)


if __name__ == "__main__":
    main()
