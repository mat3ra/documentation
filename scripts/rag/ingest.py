#!/usr/bin/env python3
"""Ingest the Mat3ra docs into a flat JSONL of retrievable chunks.

Walks ``lang/en/docs/**/*.md``, resolves the mkdocs cross-site Jinja macros,
maps each page to its canonical docs.mat3ra.com URL, and splits pages into
heading-scoped chunks. Output: ``scripts/rag/chunks.jsonl`` (one JSON object
per line: id, url, title, section, heading, text).

This is the minimal-demo ingester: lexical retrieval (BM25) is used downstream,
so no embeddings are produced here. ``--8<--`` include directives are dropped
(their content lives in the ESSE repo); resolving them is a later enhancement.

Usage:
    python scripts/rag/ingest.py
"""

import json
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
DOCS_ROOT = REPO_ROOT / "lang" / "en" / "docs"
OUT_PATH = Path(__file__).resolve().parent / "chunks.jsonl"

BASE_URL = "https://docs.mat3ra.com"

# mkdocs-macros `extra:` values, resolved at ingest time exactly as the site build would.
MACROS = {
    "guide_url": f"{BASE_URL}/guide",
    "reference_url": f"{BASE_URL}/reference",
    "dev_url": f"{BASE_URL}/dev",
}

# Directories under lang/en/docs we do not want as answerable pages.
SKIP_DIRS = {"includes", "extra", "metadata"}

MAX_CHUNK_CHARS = 6000  # split oversized heading sections so BM25 stays focused


def resolve_macros(text: str) -> str:
    """Replace `{{ guide_url }}`-style macros and strip `{% raw %}` markers."""
    text = re.sub(r"{%-?\s*(end)?raw\s*-?%}", "", text)
    for name, value in MACROS.items():
        text = re.sub(r"{{\s*" + name + r"\s*}}", value, text)
    return text


def strip_frontmatter(text: str) -> str:
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            nl = text.find("\n", end + 1)
            return text[nl + 1 :] if nl != -1 else ""
    return text


def drop_includes(text: str) -> str:
    """Remove markdown_include `--8<-- "..."` lines (content not inlined in the demo)."""
    return re.sub(r'^\s*--8<--\s*".*?"\s*$', "", text, flags=re.MULTILINE)


def page_url(rel_path: Path) -> str:
    """Map a repo-relative page path to its canonical full-site URL.

    The legacy full site serves every page, so this mapping always resolves:
    ``workflows/overview.md`` -> ``/workflows/overview/`` and
    ``workflows/index.md`` -> ``/workflows/``.
    """
    parts = list(rel_path.with_suffix("").parts)
    if parts and parts[-1] == "index":
        parts = parts[:-1]
    slug = "/".join(parts)
    return f"{BASE_URL}/{slug}/" if slug else f"{BASE_URL}/"


def extract_title(body: str, rel_path: Path) -> str:
    for line in body.splitlines():
        m = re.match(r"#\s+(.*)", line)
        if m:
            return m.group(1).strip()
    return rel_path.stem.replace("-", " ").title()


def split_into_sections(body: str):
    """Yield (heading, section_text) tuples split on H2 boundaries.

    The preamble before the first H2 (which includes the H1) is emitted with an
    empty heading. Sections longer than MAX_CHUNK_CHARS are hard-split.
    """
    lines = body.splitlines()
    heading = ""
    buf: list[str] = []

    def flush(h, b):
        text = "\n".join(b).strip()
        if not text:
            return
        for i in range(0, len(text), MAX_CHUNK_CHARS):
            yield h, text[i : i + MAX_CHUNK_CHARS]

    for line in lines:
        m = re.match(r"##\s+(.*)", line)
        if m:
            yield from flush(heading, buf)
            heading = m.group(1).strip()
            buf = []
        else:
            buf.append(line)
    yield from flush(heading, buf)


def main() -> None:
    rows = []
    for path in sorted(DOCS_ROOT.rglob("*.md")):
        rel = path.relative_to(DOCS_ROOT)
        if set(rel.parts) & SKIP_DIRS:
            continue
        raw = path.read_text(encoding="utf-8")
        body = drop_includes(resolve_macros(strip_frontmatter(raw)))
        title = extract_title(body, rel)
        section = rel.parts[0] if len(rel.parts) > 1 else "root"
        url = page_url(rel)
        for idx, (heading, text) in enumerate(split_into_sections(body)):
            breadcrumb = f"{title} > {heading}" if heading else title
            rows.append(
                {
                    "id": f"{rel.as_posix()}#{idx}",
                    "url": url,
                    "title": title,
                    "section": section,
                    "heading": heading,
                    "breadcrumb": breadcrumb,
                    "text": f"{breadcrumb}\n\n{text}",
                }
            )

    with OUT_PATH.open("w", encoding="utf-8") as f:
        for row in rows:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")

    pages = len({r["id"].split("#")[0] for r in rows})
    print(f"Ingested {pages} pages -> {len(rows)} chunks -> {OUT_PATH}")


if __name__ == "__main__":
    main()
