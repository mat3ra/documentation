# Documentation Agent — RAG Plan

Plan for an assistant that answers user questions from the content of this
repository (docs.mat3ra.com), grounded with Retrieval-Augmented Generation (RAG).

- **Status:** Phase 1 in progress — a working demo is committed in
  [`scripts/rag/`](../scripts/rag/).
- **Last updated:** 2026-07-28
- **Companion plan:** [`docs-agent-web-app.md`](docs-agent-web-app.md) (browser delivery)

---

## 1. Current state

A minimal grounded agent runs end-to-end and has been verified against live
Claude on Vertex AI.

| Piece | State |
| --- | --- |
| Corpus ingestion (`ingest.py`) | **Done.** 534 pages → 2,554 chunks |
| Lexical retrieval (BM25, in-process) | **Done.** No external index or service |
| Agentic loop with a `search_docs` tool | **Done.** Model reformulates and re-searches on its own |
| Grounding + citation rules in the system prompt | **Done.** Answers cite docs.mat3ra.com URLs |
| Vector / hybrid retrieval | Not started |
| Contextual retrieval (chunk situating) | Not started |
| `get_page` tool (fetch a whole page) | Not started |
| Evaluation harness | Not started |
| Any web interface | Not started — see the [web app plan](docs-agent-web-app.md) |

Verified behaviour: asked how to import a material from a POSCAR file, the agent
issued four searches (including section-filtered reformulations) and produced a
two-method answer citing `materials/actions/upload/` and
`tutorials/materials/import-from-files/` — both real pages.

### What changed from the original proposal

1. **Phase 0 was skipped.** The original plan proposed a "whole corpus in the
   context window" baseline before building retrieval. Retrieval turned out to be
   cheap enough to build directly, so the baseline was never needed. It remains
   useful as a *quality ceiling* for evaluation (§5) and can still be run later.
2. **The platform is Google Vertex AI, not the Claude API directly**, using
   `claude-opus-4-6`. This constrains some of the original design — see §3.2.
3. **Retrieval is lexical (BM25), not vector-based.** This was a deliberate
   scope cut, not an oversight: it removes all index infrastructure from the
   demo while still exercising the full agent loop. Its limits are known and
   measurable (§4.3).

---

## 2. Terminology: RAG is not fine-tuning

Fine-tuning changes model weights; RAG injects relevant documentation into the
prompt at question time. For a documentation assistant, RAG is the correct tool:
weight updates would go stale on every documentation change, and the answer
quality problem here is a *retrieval* problem, not a *knowledge* problem.

What is usually meant by "tuning" such an agent — making it answer better — is
achieved by iterating on **retrieval quality, the system prompt, and an
evaluation harness** (§5). This plan uses "tuning" in that sense throughout.

---

## 3. Architecture

### 3.1. Agentic RAG

```
User question
     │
     ▼
┌─────────────────────────────┐        ┌──────────────────────────┐
│  Agent (scripts/rag/agent.py)│  tool  │  Retrieval               │
│  claude-opus-4-6 on Vertex   │───────▶│  BM25 over doc chunks    │
│  system prompt (cached)      │◀───────│  (→ hybrid, later)       │
│  tool: search_docs           │ chunks └──────────────────────────┘
└─────────────┬───────────────┘
              ▼
   Answer + citations (docs.mat3ra.com URLs)
```

The agent decides *when and what* to search: it can reformulate the query,
filter by documentation section, and search repeatedly before answering. This
"agentic RAG" pattern outperforms single-shot retrieve-then-answer on multi-step
questions, and the observed behaviour confirms it — the model routinely issues
three or four searches before committing to an answer.

Design decisions as implemented:

| Decision | Choice | Rationale |
| --- | --- | --- |
| Model | `claude-opus-4-6` (Vertex) | Strong tool use and grounding |
| Region | `us-east5` | Confirmed working for this project; `global` also valid |
| Loop | Hand-written | The SDK `tool_runner` helper is not available on `AnthropicVertex` (verified against SDK 0.116) |
| Caching | `cache_control` on the system prompt | Stable prefix, re-read on every turn |
| Tool-loop bound | 8 iterations per user turn | Prevents a runaway loop from billing indefinitely |
| Auth | ADC, or `VERTEX_ACCESS_TOKEN` for local dev | No credentials in the repository |

### 3.2. Vertex AI constraints

Vertex supports the Messages API, prompt caching, extended thinking, tool use,
and citations — everything this agent needs. Several features assumed by the
original proposal are **not** available on Vertex and the plan is adjusted
accordingly:

- **Message Batches API** — unavailable. Evaluation runs (§5) cannot be
  half-price batched; budget for standard requests, or run evals against the
  Claude API directly.
- **Managed Agents** — unavailable. The hosted-agent-loop option is off the
  table while on Vertex; the loop stays in our own service.
- **`tool_runner` SDK helper** — not present on the Vertex client. The loop is
  written by hand (~30 lines) and is what the web service will reuse.

### 3.3. System prompt

The system prompt is the primary grounding control. Its essentials:

- Role and product context.
- **The grounding rule:** answer only from retrieved content; cite only URLs
  that appeared in a tool result; never invent URLs, endpoints, or UI element
  names.
- **The escalation rule:** if retrieval finds nothing relevant, say so and point
  to support rather than guessing.
- A compact list of top-level documentation sections, so the model can pick a
  sensible `section` filter.
- Answer in the user's language, in the documentation's dry style.

---

## 4. The corpus and the retrieval pipeline

### 4.1. Inventory

| Property | Value |
| --- | --- |
| Source of truth | `lang/en/docs/` — 536 Markdown files, ~187k words ≈ 260k tokens |
| Indexed | 534 pages → 2,554 chunks |
| Sites | 4 MkDocs builds: full (`/`), Guide (`/guide/`), Reference (`/reference/`), Dev (`/dev/`) |
| Structured data | ESSE JSON schemas/examples included via `--8<--` from `data/esse/` |
| Cross-links | Jinja macros `{{ guide_url }}`, `{{ reference_url }}`, `{{ dev_url }}` |
| Other languages | `lang/ja/` is machine-generated — **not indexed** |

Two consequences of this size: the corpus is small enough that indexing costs
are negligible, and small enough to fit whole into a 1M-token context window if
a non-retrieval baseline is ever wanted.

### 4.2. Ingestion (implemented)

`ingest.py` walks `lang/en/docs/**/*.md` and:

1. **Resolves the Jinja macros** as the mkdocs-macros plugin would, so
   cross-site links in retrieved text are real URLs.
2. **Strips front matter and `{% raw %}` markers**, keeping their contents so
   templating tutorials stay searchable verbatim.
3. **Maps each page to its canonical URL.** The full site serves every page, so
   `lang/en/docs/<path>/<page>.md` → `https://docs.mat3ra.com/<path>/<page>/`.
4. **Chunks on H2 boundaries** with a breadcrumb (`Page title > Section`)
   prepended to every chunk — this materially improves both retrieval and the
   quality of the model's citations.

Known gap: `--8<--` include directives are currently dropped, so questions about
ESSE JSON schema internals are not yet answerable. Inlining them (with a size
cap) is the first ingestion improvement.

### 4.3. Retrieval: current and next

Today: BM25 over the chunk text, top 6 results, optional section filter.

BM25 is strong on exact terms — code identifiers, file formats, UI labels — and
weak on paraphrase. The failure mode is visible in practice: the query "REST API
authentication" ranks the JupyterLite authentication page above the REST API
one, because it matches the literal words rather than the concept.

Planned upgrades, in order of expected value:

| Step | Change | Why |
| --- | --- | --- |
| 1 | **Contextual retrieval** — prepend a 50–100 token situating summary to each chunk before indexing, generated once with a cheap model | Anthropic reports ~49% fewer retrieval failures; a one-time cost of a few dollars at this corpus size |
| 2 | **Embeddings + hybrid search** — vector search fused with BM25 by reciprocal-rank fusion | Fixes paraphrase and concept queries; multilingual embeddings also let Japanese questions match English chunks |
| 3 | **Reranking** — top-20 → top-5 with a reranker | Precision gain; add only if evaluation justifies it |
| 4 | **`get_page` tool** — let the agent pull a whole page when a chunk lacks context | Cheap to add; helps multi-step procedural questions |

The retrieval interface (`Retriever.search`) is deliberately narrow so these
swap in without touching the agent loop or the web service.

### 4.4. Keeping the index fresh

The index is currently rebuilt by hand (`python ingest.py`). The generated
`chunks.jsonl` is **not committed** — it is a build artifact.

For production: rebuild on merge to `main` in CI, and version the artifact with
the documentation commit it was built from, so an answer can always be traced to
a documentation snapshot. See the [web app plan](docs-agent-web-app.md) for how
that artifact reaches the deployed service.

---

## 5. Evaluation — how the agent actually gets "tuned"

This is the substitute for fine-tuning: a measurable loop over retrieval and
prompt parameters. It is the highest-leverage unbuilt piece of this plan.

1. **Golden set (~75–100 question/answer pairs).** Sources: real support
   questions, tutorial steps rephrased as questions, pricing and account FAQs,
   REST API usage questions, plus ~10 *unanswerable* questions where the correct
   behaviour is "not in the documentation, contact support". Each entry records
   the question, the expected source page(s), and the key facts a correct answer
   must contain.
2. **Retrieval metrics:** recall@5 and MRR of the expected page among retrieved
   chunks. These need no model call — fast and cheap enough to run on every
   pipeline change.
3. **Answer metrics:** model-as-judge scoring of faithfulness (no claims beyond
   retrieved text), citation correctness (URLs resolve and support the claim),
   and completeness against the key facts.
4. **Tuning levers**, iterated against the golden set: chunk size, top-k, fusion
   weights, reranking, the contextual-retrieval prompt, system prompt wording,
   and model tier.
5. **Regression gate:** run the evaluation in CI when `scripts/rag/` or the
   system prompt changes.

Note the Vertex constraint from §3.2: no Batch API, so evaluation runs are
billed at standard rates.

---

## 6. Roadmap

| Phase | Scope | State |
| --- | --- | --- |
| 0 | Full-corpus-in-context baseline | Skipped — optional, as an evaluation ceiling |
| 1 | Ingestion, BM25 retrieval, agentic loop, CLI | **Done** |
| 2 | Golden set + evaluation harness | Next — everything below is tuned against it |
| 3 | Contextual retrieval, embeddings, hybrid search, `get_page` | Planned (§4.3) |
| 4 | Web delivery | See [`docs-agent-web-app.md`](docs-agent-web-app.md) |
| 5 | Platform actions — tools generated from `rest-api/` docs, authenticated per user | Later; needs its own security review |

---

## 7. Cost

Order-of-magnitude planning figures only; Vertex bills through Google Cloud and
current rates should be confirmed against Vertex pricing before committing.

- **Indexing** is negligible — a corpus this small embeds for a few dollars, and
  contextual retrieval adds a one-time cost in the same range.
- **Per question**, the dominant cost is the model call: a handful of retrieved
  chunks plus a cached system prompt in, a few hundred tokens out, multiplied by
  the number of search rounds the agent chooses to make.
- **Prompt caching** on the system prompt is the single largest lever, since the
  same prefix is re-read on every turn of every conversation.
- A smaller model tier is worth evaluating for high-volume simple questions once
  the golden set can prove parity.

---

## 8. Risks and guardrails

- **Hallucinated URLs or UI paths** — mitigated by the cite-only-from-tool-results
  rule; must be verified by the evaluation judge rather than assumed.
- **Stale answers after documentation edits** — CI re-indexing on merge (§4.4).
- **Runaway tool loops** — bounded at 8 iterations per turn.
- **Prompt injection and abuse** — relevant once the agent is exposed publicly;
  covered in the [web app plan](docs-agent-web-app.md).
- **Query privacy** — user questions may contain proprietary research context. A
  logging and retention policy is required before any public deployment.
- **Machine-translated pages** — `lang/ja/` is never indexed; multilingual
  answers come from the model, not from translated chunks.

## 9. Next steps

1. Build the golden question set — the highest-leverage artifact in this plan.
2. Add the retrieval-metric harness (no model calls needed) and record a BM25
   baseline to measure every later change against.
3. Implement contextual retrieval and hybrid search; keep BM25 as the fallback
   and compare on the golden set.
