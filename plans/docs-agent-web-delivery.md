# Documentation Agent — Web Delivery Plan

Plan for turning the working command-line agent (the `mat3ra_docs_agent`
package in the
[`documentation-agent`](https://github.com/mat3ra/documentation-agent)
repository) into a browser-based chat.
"Web delivery" here means shipping the documentation agent to browsers — not
to be confused with the platform application, whose repository is named
`web-app`.

- **Status:** Active — the architecture reference for Phase 2 (docs launch);
  nothing built yet.
- **Last updated:** 2026-07-31
- **Companion plan:** [`docs-agent-rag.md`](docs-agent-rag.md) (agent and retrieval strategy)
- **Implementation plan:** [`docs-agent-implementation.md`](docs-agent-implementation.md)

---

## 1. Two questions answered first

### 1.1. Can the chat be browser-only, with no backend?

**No.** A pure front-end implementation is not viable, for three reasons:

1. **Credentials.** Calling Vertex requires a Google OAuth token or service
   account credential. Anything shipped to the browser is public, so embedding
   one would expose billable access to everyone.
2. **Transport.** The Anthropic Vertex SDK is server-side, and Vertex endpoints
   are not CORS-enabled for arbitrary browser origins.
3. **Control.** Rate limiting, abuse protection and logging must live somewhere
   the user cannot tamper with.

A theoretical exception — signing every visitor in with Google and using their
own token — fails on both CORS and the requirement that each visitor have
Vertex access. Unworkable for public documentation.

So the architecture is always **browser → our backend → retrieval + Vertex**.
The backend is thin: it is the existing `run_turn()` loop behind an HTTP
endpoint with streaming.

### 1.2. Does the dataset need a vector representation?

**Not in order to go browser-based.** Retrieval runs on the backend either way,
so the current in-process BM25 index works unchanged behind an API. Vectors are
a **retrieval-quality** upgrade, orthogonal to web delivery, and are planned
separately in [`docs-agent-rag.md`](docs-agent-rag.md) §4.3.

Browser-side vector search (shipping an index and embedding in the page) is
technically possible but pointless here: the model call must be server-side
regardless, so there is no round trip to save.

**Recommendation:** ship the first web version on BM25; add embeddings on the
retrieval plan's own schedule.

---

## 2. Where the service should live

### 2.1. Not inside the platform application

The platform (platform.mat3ra.com) is a large Meteor application maintained
in the `web-app` repository. It is the wrong home for a public documentation
assistant:

| | Standalone service | Inside the platform application |
| --- | --- | --- |
| Reuses the existing demo | Yes, unchanged (Python) | No — retrieval and the Vertex call must be ported |
| Streaming | Native server-sent events | Meteor methods are RPC; needs a non-idiomatic raw route |
| Blast radius | Isolated | Adds an unauthenticated, abuse-exposed endpoint to the application that runs billing, jobs and accounts |
| Deployment coupling | Independent, fast iteration | Tied to the platform release cadence |
| Fit with existing architecture | Matches the existing pattern of separate Python services | Enlarges the monolith |

The decisive point is the third row: the majority of this agent's users are on
the documentation domain, not signed into the platform, so an anonymous endpoint
would be added to the most sensitive application for the benefit of users who
are mostly somewhere else.

### 2.2. One service, two surfaces

Build the agent once and let both front ends call it:

```
docs.mat3ra.com widget ──┐
                         ├──▶  docs agent service  ──▶  Vertex (claude-opus-4-6)
in-platform "Ask AI"  ───┘      (BM25 → hybrid retrieval)
```

The public documentation widget comes first. The in-platform surface is a later
addition: a small React component calling the same service through a thin
authenticated route that injects user identity for per-user rate limiting — no
duplicated retrieval, no second set of credentials.

---

## 3. Components

### 3.1. Backend service

A small Python service (FastAPI) reusing the existing retriever and loop.

- **`POST /chat`** — accepts the conversation, responds with a server-sent event
  stream of text deltas plus a final `sources` event. Streaming is required both
  for chat responsiveness and to avoid proxy timeouts on multi-search answers.
- **`GET /health`** — readiness probe.
- Loads the chunk index once at startup (2,554 chunks: sub-second, a few MB).
- Authenticates to Vertex through the runtime service account — no secrets in
  the image.

The one structural difference from the command-line version is streaming
combined with tool use: stream each assistant turn, and when a turn ends in a
tool call, run the search, append the result, and start the next streamed turn.
This also gives the user visible progress ("Searching documentation…").

**Refactor first:** split `agent.py` into `rag_core.py` (retriever, tool
definition, system prompt, result formatting) plus a thin command-line wrapper,
so the service imports the same core rather than copying it. The retriever was
written to support this — it raises on a missing index instead of exiting the
process.

### 3.2. Front-end widget

An embeddable chat widget injected into the MkDocs theme, so an "Ask AI"
launcher appears on every documentation page.

- Small self-hosted bundle, referenced from `extra_javascript` in **all** MkDocs
  configuration files (the repository requires configuration changes to be
  mirrored across every site config).
- Renders streamed Markdown incrementally, shows a searching state during tool
  calls, and renders the final sources as clickable links.
- Sanitises rendered output — model text is never injected as raw HTML.
- Conversation kept in memory only.

---

## 4. Repository layout and version control

The documentation repository is **public**. The service's operational
configuration should not be. Split by what each part is coupled to:

> **Revised 2026-07-31 (decision D6).** The split below was reconsidered: the
> agent core now lives with the service rather than here. The reasoning about
> what must stay private is unchanged; only the boundary moved.

| Concern | Repository | Reason |
| --- | --- | --- |
| Corpus (the Markdown itself) | **This (public) repository** | It is the documentation |
| Ingestion, retrieval core, prompt, agent loop, HTTP service, container, deployment | **`documentation-agent` (private)** | One repository owns all agent code, so there is no cross-repository package version to keep in step; ingestion reads a documentation checkout at a pinned commit |
| Built index | **Baked into the service image**, not committed | Generated content; versioned by the documentation commit it was built from |

The rejected alternative was a one-way package dependency (this repository
publishing an installable core that the service imports). It works, but it
splits one codebase across two release cadences for no gain now that the
service is the only consumer. The service checks out the documentation at a
specific SHA rather than vendoring it, so no Git LFS history enters the image.

---

## 5. Deployment

Two viable paths. Both use the private-service-repository layout from §4; only
the runtime differs.

**Option A — Serverless (recommended).** A managed container runtime such as
Cloud Run in the same cloud project as Vertex. Scale-to-zero suits bursty,
low-volume traffic, and — the reason it directly solves a problem already hit in
development — an attached service account makes credentials resolve
automatically, so no token or key is handled anywhere. Deployed by its own
pipeline on merge, independent of the platform release train.

**Option B — Alongside the platform stack.** The service runs as a container on
existing infrastructure, shipped by the existing configuration-management and CI
pipeline like other backend services, authenticating to Vertex through the
instance service account. One pipeline and one monitoring surface, at the cost
of the platform's slower release cadence and no scale-to-zero.

Choose A if the agent should iterate independently — appropriate while it is
experimental. Choose B if operations prefers a single pipeline.

**Fallback — no new service at all.** Since the documentation site is already
deployed on Netlify, the agent loop can run as an edge function in this
repository: same deployment pipeline, nothing new to operate. The trade-offs are
real: a cloud service-account key must be stored as a build secret (which the
serverless option avoids entirely), the retriever must be ported to JavaScript,
and function execution limits constrain long multi-search answers. Reasonable
for a demonstration; weaker as a foundation.

### 5.1. Practices that apply to any of these

1. **One service, one repository, pinned as a submodule** — the stack records an
   exact commit, so deployments are reproducible and revertible.
2. **No credentials in Git, ever.** Prefer attached or instance service accounts
   over key files, and federated identity over long-lived credentials in CI.
3. **Immutable, versioned artifacts.** Bake the index and the documentation
   commit it came from into the image: one image is one documentation snapshot,
   and rollback is redeploying the previous image.
4. **Two decoupled triggers.** A documentation merge rebuilds the index
   artifact; a service change or a new index rebuilds and redeploys the service.
   The service pins an index version rather than rebuilding the corpus itself.
5. **Least privilege.** The runtime identity gets model access and read access to
   the index, and nothing else. The future in-platform surface injects user
   identity at the proxy rather than widening this identity.
6. **Environment parity.** The same container runs locally and in production.

---

## 6. Security and operations

- **CORS:** restrict to the documentation origins plus localhost for development.
- **Untrusted input:** every request body is attacker-controlled. Rate-limit per
  address and session, and cap both conversation length and tool iterations per
  turn (the loop is already bounded at 8).
- **Read-only tools.** The public agent can search documentation and nothing
  else. Platform actions are a later, separately reviewed capability.
- **Output safety.** Retrieved text comes from our own corpus, but rendered
  answers are still sanitised, and the cite-only-from-tool-results rule remains
  the guard against fabricated links.
- **Cost control:** per-session token ceiling, spend alerting on the cloud
  project, and a bot check in front of the public endpoint if abuse appears.
- **Privacy:** questions may contain proprietary research context. Decide
  logging and retention before launch; log minimally.
- **Observability:** record latency, tool-call counts, token usage and stop
  reasons. These logs also supply real questions for the golden evaluation set.

---

## 7. Roadmap

Milestone identifiers and phase numbering follow the
[implementation plan](docs-agent-implementation.md) §3, which supersedes
this table for sequencing.

| Milestone (phase) | Scope | Estimate |
| --- | --- | --- |
| M1 (Phase 1) | Extract the shared core package; command-line wrapper imports it | 0.5–1 day |
| M3 (Phase 2) | FastAPI `/chat` with streaming and the tool loop; CORS; local run | 2–4 days |
| M4 (Phase 2) | Embeddable widget in the MkDocs theme; streamed Markdown and citations | 3–5 days |
| M5 (Phase 2) | Container, deployment pipeline, service-account auth, rate limiting, spend alerts | 2–3 days |
| M7 (Phase 3) | Hybrid retrieval behind the same interface; evaluation gate; latency tuning | 1–2 weeks |
| Phases 4–5 | In-platform surface (M8); platform actions ([`docs-agent-platform-actions.md`](docs-agent-platform-actions.md), separate security review) | As prioritised |

## 8. Cost

Incremental over the agent itself (see [`docs-agent-rag.md`](docs-agent-rag.md) §7):

- **Hosting:** a scale-to-zero service for low-volume documentation traffic is a
  small monthly figure plus per-request compute. Retrieval is CPU-cheap; the
  model call dominates.
- **Storage:** none for the first version — the index is in memory. Hybrid
  retrieval later adds a small managed-database line item.

## 9. Next steps

1. Confirm the surface (documentation-theme widget) and the deployment option.
2. Extract `rag_core.py` so the service and the command-line tool share one core.
3. Stand up `/chat` locally and stream one grounded answer end-to-end.
4. Create the Vertex service account for the target runtime, removing the
   developer access-token workaround.
