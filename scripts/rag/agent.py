#!/usr/bin/env python3
"""Minimal grounded docs agent: BM25 retrieval + Claude Opus 4.6 on Vertex AI.

Runs an agentic tool-use loop against the documentation chunks produced by
``ingest.py``. Claude decides when to call ``search_docs``, reads the returned
chunks, and answers with citations to docs.mat3ra.com URLs.

Prerequisites:
    pip install -U google-cloud-aiplatform "anthropic[vertex]" rank_bm25
    gcloud auth application-default login          # once, for ADC
    python scripts/rag/ingest.py                   # produces chunks.jsonl

Usage:
    python scripts/rag/agent.py "How do I import a POSCAR file?"   # one-shot
    python scripts/rag/agent.py                                    # interactive REPL

Config via env vars:
    VERTEX_PROJECT_ID  Google Cloud project (required; falls back to
                       GOOGLE_CLOUD_PROJECT)
    VERTEX_REGION      (default: us-east5)
    RAG_MODEL          (default: claude-opus-4-6)
"""

import json
import os
import re
import sys
from pathlib import Path

from anthropic import AnthropicVertex
from rank_bm25 import BM25Okapi

CHUNKS_PATH = Path(__file__).resolve().parent / "chunks.jsonl"

PROJECT_ID = os.environ.get("VERTEX_PROJECT_ID") or os.environ.get("GOOGLE_CLOUD_PROJECT", "")
REGION = os.environ.get("VERTEX_REGION", "us-east5")
MODEL = os.environ.get("RAG_MODEL", "claude-opus-4-6")
# Optional: a pre-fetched OAuth token, e.g.
#   VERTEX_ACCESS_TOKEN=$(gcloud auth print-access-token) python agent.py ...
# Use this when application-default credentials are unavailable/stale; when unset
# the SDK falls back to ADC (google.auth.default()).
ACCESS_TOKEN = os.environ.get("VERTEX_ACCESS_TOKEN") or None

TOP_K = 6
MAX_CHUNK_CHARS_IN_RESULT = 1600
# Ceiling on search/answer round-trips within a single user turn. Guards against a
# runaway tool loop, which would otherwise never terminate and bill every request.
MAX_TOOL_ITERATIONS = 8

SYSTEM_PROMPT = """You are the Mat3ra platform documentation assistant. Mat3ra \
(mat3ra.com) is a cloud platform for materials and chemicals simulation.

Answer questions using ONLY content returned by the search_docs tool. Rules:
- Call search_docs before answering any question about the platform. Reformulate \
and search again (different wording, or a section filter) if the first results \
do not clearly answer the question.
- Ground every factual claim in a retrieved chunk. After the answer, list the \
docs.mat3ra.com URLs you used under a "Sources:" heading. Only cite URLs that \
appeared in a tool result — never invent URLs, REST endpoints, or UI element names.
- If retrieval does not contain the answer, say so plainly and suggest contacting \
Mat3ra support rather than guessing.
- Be concise and use the docs' dry, third-person style. Answer in the user's language.

Top-level documentation sections (use as the optional `section` filter):
tutorials, getting-started, materials, materials-designer, workflows, \
workflow-designer, jobs, jobs-designer, jobs-cli, cli, rest-api, models, methods, \
properties, models-directory, methods-directory, properties-directory, \
software, software-directory, accounts, pricing, collaboration, security, \
infrastructure, data-on-disk, remote-connection, jupyterlite, benchmarks."""

SEARCH_TOOL = {
    "name": "search_docs",
    "description": (
        "Full-text search over the Mat3ra documentation. Returns the most "
        "relevant page sections, each with its docs.mat3ra.com URL. Call this "
        "before answering any platform question; call it again with reformulated "
        "queries if needed."
    ),
    "input_schema": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "Natural-language search query.",
            },
            "section": {
                "type": "string",
                "description": (
                    "Optional top-level section to restrict results to, e.g. "
                    "'tutorials', 'rest-api', 'pricing'. Omit to search everything."
                ),
            },
        },
        "required": ["query"],
    },
}

_TOKEN_RE = re.compile(r"[a-z0-9]+")


def tokenize(text: str) -> list[str]:
    return _TOKEN_RE.findall(text.lower())


class Retriever:
    def __init__(self, chunks_path: Path):
        if not chunks_path.exists():
            raise FileNotFoundError(
                f"Missing {chunks_path}. Run: python scripts/rag/ingest.py"
            )
        self.chunks = [json.loads(line) for line in chunks_path.read_text().splitlines() if line]
        self.bm25 = BM25Okapi([tokenize(c["text"]) for c in self.chunks])

    def search(self, query: str, section: str = "", k: int = TOP_K) -> list[dict]:
        scores = self.bm25.get_scores(tokenize(query))
        order = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)
        results = []
        for i in order:
            if scores[i] <= 0:
                continue
            chunk = self.chunks[i]
            if section and chunk["section"] != section.strip().lower():
                continue
            results.append(chunk)
            if len(results) >= k:
                break
        return results


def format_results(results: list[dict]) -> str:
    if not results:
        return "No matching documentation found. Try a different query or section."
    blocks = []
    for n, c in enumerate(results, 1):
        text = c["text"][:MAX_CHUNK_CHARS_IN_RESULT]
        blocks.append(f"[{n}] {c['breadcrumb']}\nURL: {c['url']}\n\n{text}")
    return "\n\n---\n\n".join(blocks)


def run_turn(client: AnthropicVertex, retriever: Retriever, messages: list[dict]) -> str:
    """Run one user turn to completion, executing tool calls in a loop."""
    for _ in range(MAX_TOOL_ITERATIONS):
        resp = client.messages.create(
            model=MODEL,
            max_tokens=4096,
            system=[
                {"type": "text", "text": SYSTEM_PROMPT, "cache_control": {"type": "ephemeral"}}
            ],
            tools=[SEARCH_TOOL],
            messages=messages,
        )
        messages.append({"role": "assistant", "content": resp.content})

        if resp.stop_reason != "tool_use":
            return "".join(b.text for b in resp.content if b.type == "text")

        tool_results = []
        for block in resp.content:
            if block.type != "tool_use":
                continue
            query = block.input.get("query", "")
            section = block.input.get("section", "")
            hits = retriever.search(query, section)
            print(f"  \033[2m[search_docs] {query!r}"
                  f"{f' section={section}' if section else ''} -> {len(hits)} hits\033[0m")
            tool_results.append(
                {
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": format_results(hits),
                }
            )
        messages.append({"role": "user", "content": tool_results})

    return (
        f"Stopped after {MAX_TOOL_ITERATIONS} search rounds without reaching an "
        "answer. Try asking a more specific question."
    )


def main() -> None:
    if not PROJECT_ID:
        sys.exit(
            "Set VERTEX_PROJECT_ID (or GOOGLE_CLOUD_PROJECT) to the Google Cloud "
            "project with access to Claude models on Vertex AI."
        )
    try:
        retriever = Retriever(CHUNKS_PATH)
    except FileNotFoundError as exc:
        sys.exit(str(exc))
    client = AnthropicVertex(project_id=PROJECT_ID, region=REGION, access_token=ACCESS_TOKEN)
    print(f"\033[2mModel: {MODEL} via Vertex (project={PROJECT_ID}, region={REGION}) | "
          f"{len(retriever.chunks)} chunks\033[0m\n")

    messages: list[dict] = []

    if len(sys.argv) > 1:
        question = " ".join(sys.argv[1:])
        messages.append({"role": "user", "content": question})
        print(run_turn(client, retriever, messages))
        return

    print("Ask a question about the Mat3ra platform (Ctrl-D or 'exit' to quit).\n")
    while True:
        try:
            question = input("\033[1m> \033[0m").strip()
        except EOFError:
            break
        if question.lower() in {"exit", "quit"}:
            break
        if not question:
            continue
        messages.append({"role": "user", "content": question})
        answer = run_turn(client, retriever, messages)
        print(f"\n{answer}\n")


if __name__ == "__main__":
    main()
