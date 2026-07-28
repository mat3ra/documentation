# Docs RAG Agent — Minimal Demo

A grounded question-answering agent over the Mat3ra documentation. It retrieves
relevant doc sections with BM25 and answers using **Claude Opus 4.6 on Google
Vertex AI**, citing `docs.mat3ra.com` URLs. This is the Phase-1 minimal build
from [`plans/docs-agent-rag.md`](../../plans/docs-agent-rag.md).

## What it does

1. `ingest.py` walks `lang/en/docs/**/*.md`, resolves the mkdocs cross-site
   macros, maps each page to its canonical URL, and splits pages into
   heading-scoped chunks → `chunks.jsonl`.
2. `agent.py` loads those chunks into an in-memory BM25 index and runs an
   agentic tool-use loop: Claude calls `search_docs`, reads the results, and
   answers with citations. If retrieval finds nothing, it says so rather than
   guessing.

Deliberately minimal: lexical retrieval only (no embeddings/vector DB), no
reranking, no web service. Those are the next steps in the plan.

## Setup

```bash
cd scripts/rag
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Set the Google Cloud project to use. It needs the **Vertex AI API** enabled and
access to the Anthropic Claude models granted in Model Garden:

```bash
export VERTEX_PROJECT_ID=my-gcp-project
```

Then authenticate, either via Application Default Credentials:

```bash
gcloud auth application-default login
gcloud auth application-default set-quota-project "$VERTEX_PROJECT_ID"
```

…or, if ADC is unavailable/stale, by passing a token from the active gcloud
account via `VERTEX_ACCESS_TOKEN` (see below).

## Run

```bash
python ingest.py                                  # build chunks.jsonl

# ADC configured:
python agent.py "How do I import a POSCAR file?"  # one-shot
python agent.py                                   # interactive REPL

# Or pass a token from the active gcloud account (no ADC needed):
VERTEX_ACCESS_TOKEN=$(gcloud auth print-access-token) python agent.py "How do I import a POSCAR file?"
```

## Configuration

| Env var               | Default           | Meaning                                     |
| --------------------- | ----------------- | ------------------------------------------- |
| `VERTEX_PROJECT_ID`   | _(required)_      | GCP project; falls back to `GOOGLE_CLOUD_PROJECT` |
| `VERTEX_REGION`       | `us-east5`        | Vertex endpoint (`us-east5`, `global`, …)   |
| `RAG_MODEL`           | `claude-opus-4-6` | Vertex Claude model ID                      |
| `VERTEX_ACCESS_TOKEN` | _(unset)_         | OAuth token to use instead of ADC; token is short-lived (~1h) |

## Known limitations (demo scope)

- BM25 only — no semantic matching; paraphrased queries can miss. Vector +
  hybrid search is the next step.
- `--8<--` ESSE schema includes are dropped during ingest, so deep JSON-schema
  questions are not yet answerable.
- No evaluation harness yet; correctness is spot-checked by hand.
- Index is rebuilt manually (`python ingest.py`); no CI refresh on merge.
