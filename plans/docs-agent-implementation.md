# Documentation Agent — Implementation Plan

Execution plan for shipping the documentation assistant on docs.mat3ra.com.
The companion documents hold the reasoning; this one holds the work: milestones,
file-level work items, acceptance criteria, and the decisions still open.

- **Status:** Active, living document — §3 is the initiative's progression
  tracker. M1–M5 are done: the agent is deployed and answering on Cloud Run.
  Only the launch gate (M6) stands between here and a public beta.
- **Last updated:** 2026-07-31
- **Companion plans:** [`docs-agent-rag.md`](docs-agent-rag.md) (retrieval and
  evaluation strategy), [`docs-agent-web-delivery.md`](docs-agent-web-delivery.md)
  (architecture and hosting rationale)

---

## 1. Scope and definition of done

Shipped means: an "Ask AI" launcher on every page of every documentation site
(eight as of 2026-07-31 — see M4) opens a chat that streams grounded, cited
answers from a production service, with abuse limits, spend controls, and an
evaluation gate in CI.

Out of scope for v1: hybrid/vector retrieval beyond an eval-gated upgrade
(M7), the in-platform "Ask AI" surface (specified in M8, scheduled
post-launch), and platform-action tools (specified in
[`docs-agent-platform-actions.md`](docs-agent-platform-actions.md),
sequenced after M8).

## 2. Decision register

Defaults follow the companion plans. Items marked **needs sign-off** block a
later milestone but nothing before it.

| # | Decision | Default | Status |
| --- | --- | --- | --- |
| D1 | Runtime | Cloud Run, same project as Vertex access ([web delivery plan §5](docs-agent-web-delivery.md), Option A) | Adopted |
| D2 | Service code location | Private repository [`mat3ra/documentation-agent`](https://github.com/mat3ra/documentation-agent), pinned into the platform stack later if wanted | **Adopted** — repository created 2026-07-31 |
| D3 | Google Cloud project | Dedicated project `mat3ra-documentation` with spend controls per M5.1 | **Done 2026-07-31** — project, budget and native spend cap in place; Vertex AI enabled and confirmed end to end from Cloud Run. Claude Model Garden enablement is still outstanding and blocks only the D5 comparison |
| D4 | Public endpoint | Default `*.run.app` URL for beta; a `mat3ra.com` subdomain before general availability | Beta default adopted |
| D5 | Model | Provider abstraction over Vertex: **Gemini by default** (`gemini-3.6-flash`, `global`), Claude (`claude-opus-4-6`, `us-east5`) behind the same interface once Model Garden is enabled. Tier changes only through the evaluation harness | **Revised 2026-07-31** — Gemini needs no Model Garden step, so it unblocks work today; the abstraction keeps the choice reversible |
| D6 | Core package location | The agent core (ingestion, retrieval, prompt, loop) lives in the **`documentation-agent` repository**; this repository provides the corpus only. Ingestion reads a documentation checkout via `--docs-root` | **Revised 2026-07-31** — supersedes the earlier "core stays in `scripts/rag/`" split; one repository owns all agent code, so there is no cross-repository package dependency to keep in step |
| D7 | Logging and retention | Store question, tool trace, answer, and token counts for 30 days to seed the golden set; no IP addresses joined to content; disclosed in the widget footer | Needs sign-off before launch |
| D8 | Launch quality bar | Regression gate set just below the measured BM25 baseline: **recall@5 ≥ 0.65, MRR ≥ 0.50** (baseline 0.688 / 0.543), plus zero hallucinated URLs. Refusal on the unanswerable subset must be **1.00** | **Met with replication 2026-08-01**: refusal 1.00 in four consecutive runs; faithfulness 1.00 in both runs after the judge was corrected to see exactly what the model saw (earlier 0.892 figures were the judge's truncated view, not the agent); zero hallucinated URLs in every run ever made |

## 3. Phases and workstreams

The initiative numbering, shared by all four plans (this table is the
authority):

| Phase | Name | Contents | State |
| --- | --- | --- | --- |
| 0 | Prototypes | BM25 demo in `scripts/rag/`; desktop automation experiment in the platform repository ([`web-app#2894`](https://github.com/mat3ra/web-app/pull/2894)) | **Done** |
| 1 | Foundations | M1 core package, M2 evaluation harness | **Done 2026-07-31** |
| 2 | Docs launch | M3 service, M4 widget, M5 deployment, M6 hardening | In progress — M3–M5 done 2026-07-31; M6 (launch gate) remains |
| 3 | Retrieval quality | M7 upgrades, evaluation-gated | Planned, post-launch |
| 4 | Platform embed | M8, stages M8.1–M8.3 | Planned, post-launch |
| 5 | Platform actions | Stages A1–A4 in [`docs-agent-platform-actions.md`](docs-agent-platform-actions.md) | Proposed |

Phases 3 and 4 are independent and can interleave; Phase 5 requires M8.2.

This table (with the milestone table below) is the progression tracker: when
a phase or milestone completes, its State cell gains the date and pull
request. Documents keep their status in place — nothing moves to a
"complete" folder.

Within Phases 1–2, two tracks run interleaved — delivery (M1, M3–M6) and
quality (M2) — reconciled as: **delivery does not wait for the full
evaluation harness, but launch does.** Retrieval-metric evaluation (cheap,
no model calls) lands before any retrieval change; the answer-quality gate
must pass before M6.

| Milestone | Phase | Track | Estimate |
| --- | --- | --- | --- |
| M1 Shared core package | 1 | Delivery | **Done 2026-07-31** |
| M2 Evaluation harness + golden set | 1 | Quality | **Done 2026-07-31** |
| M3 Backend service | 2 | Delivery | **Done 2026-07-31** |
| M4 Documentation widget | 2 | Delivery | **Done 2026-08-01** |
| M5 Deployment + index pipeline | 2 | Delivery | **Done 2026-07-31** |
| M6 Launch hardening | 2 | Both | 1–2 days |
| M7 Retrieval upgrades | 3 | Quality | 1–2 weeks |
| M8 In-platform surface | 4 | Delivery | ~1 week, staged |

Dependencies: M1 → M2 and M3; M3 → M4 (the widget develops against a local
service); M5 can start alongside M4; M6 needs M2, M4, M5; M8 follows M6 and
leans on M4's embeddable-module constraint; stages A1–A4 (Phase 5) follow
M8.2. Elapsed time to a public beta (end of Phase 2): roughly two to three
weeks of focused work.

---

## 4. Milestones

### M1. Shared core package — **done 2026-07-31**

The demo became the installable package the service will import, per
[web delivery plan §3.1](docs-agent-web-delivery.md) ("refactor first"), in
the `documentation-agent` repository (D6):

```
pyproject.toml              # mat3ra-docs-agent; [anthropic] and [dev] extras
mat3ra_docs_agent/
  config.py                 # environment-driven settings
  ingest.py                 # chunker; --docs-root points at a docs checkout
  retriever.py              # Retriever, tokenize, format_results
  prompt.py                 # SYSTEM_PROMPT, SEARCH_TOOL
  providers/                # base, gemini_vertex, anthropic_vertex
  loop.py                   # run_turn, provider-agnostic
  cli.py                    # docs-agent, docs-agent-ingest
tests/                      # 42 tests, offline
.github/workflows/tests.yml # pytest on 3.10 and 3.12
```

Beyond the original scope, the model backend was abstracted (D5): `Provider`
exposes `add_user_message` / `add_tool_results` / `generate` over neutral
types, each adapter holding the conversation in its own native format. The
loop never sees a vendor dialect, which is what makes the Gemini-now,
Claude-later switch a one-line change.

Verified: 42 offline tests pass; ingestion reproduces the demo exactly (534
pages → 2,554 chunks); a live query on Gemini returns the same two-method
POSCAR answer with the same citations as the original demo.

Two findings worth carrying forward:

- **BM25 needs a realistic corpus.** Inverse document frequency is
  meaningless over one document — scores go non-positive and the relevance
  filter drops everything. Test fixtures use several pages; the M2 harness
  must not evaluate against toy corpora.
- **Gemini 3.x spends thinking tokens before emitting a tool call.** A small
  output budget starves the call and produces an empty turn, so
  `MAX_OUTPUT_TOKENS` is 8192.

### M2. Evaluation harness and golden set — **done 2026-07-31**

The tuning loop from [RAG plan §5](docs-agent-rag.md), in the
`documentation-agent` repository under `eval/`: `golden.yaml`, a free
retrieval harness, a paid answer harness, and a README carrying the
baseline.

The golden set holds 37 questions — 32 answerable and 5 the documentation
deliberately cannot answer, scored separately, because an assistant that
scores well elsewhere and improvises on those is worse than useless.
Questions are phrased as a user would ask them rather than as the pages are
written. Expected pages are validated against the index before every run, so
a renamed page fails the run instead of quietly depressing the metrics.

**Recorded BM25 baseline** (32 answerable questions, 534 pages / 2,554
chunks):

| recall@1 | recall@3 | recall@5 | recall@10 | MRR |
| --- | --- | --- | --- | --- |
| 0.406 | 0.594 | 0.688 | 0.906 | 0.543 |

For about a third of questions the top hit is already right; for about a
third the right page is not in the top five. The failures are precisely the
paraphrase weakness §4.3 predicted — "How does authentication work for the
REST API?" ranks the *JupyterLite* authentication page first — which is the
concrete case hybrid retrieval (M7) has to beat.

Two things this measurement establishes:

- **The numbers are a lower bound on the agent, not a verdict on it.** The
  agent reformulates and re-searches, so a page at rank 8 for the user's
  original phrasing is often still cited correctly — verified on the REST API
  question. Retrieval recall is a leading indicator.
- **Answer evaluation separates the deterministic from the judged.** Every
  cited URL must exist in the corpus; that check cannot itself hallucinate,
  so it is reported on its own and any failure fails the run, independent of
  a judge's opinion.

CI gates every pull request on the retrieval metrics at the D8 thresholds;
the answer harness runs on demand (no Batch API on Vertex) and is where the
Gemini/Claude and model-tier comparison gets settled (D5).

**The answer baseline found two real defects on its first run**, neither
visible from spot-checking, and both now the immediate tuning work:

| Hallucinated URLs | Cited an expected page | Faithful | Citations support | Completeness | Refused correctly |
| --- | --- | --- | --- | --- | --- |
| 0 | 0.906 | 0.892 | 0.973 | 0.959 | **0.800** |

- **Refusal, 4 of 5.** Asked whether the platform is faster than VASP on a
  64 GB laptop, the agent answered that it is "significantly faster",
  justified with real hardware specifications. The specifications are
  documented; the comparative claim is not and cannot be. The dangerous
  shape is a question *adjacent* to documented material, where retrieval
  returns something plausible and the model completes the argument itself —
  which no amount of retrieval improvement fixes.
- **Faithfulness 0.892.** Four answers invented interface details (a
  dropdown, a submit button, walltime advice). No URL was ever invented, so
  half the grounding rule holds and the half covering UI element names does
  not.

Both are prompt problems, not retrieval problems, and the harness now makes
the fix measurable rather than a matter of opinion. This is the tuning loop
working as designed: §8 listed hallucinated UI paths as a risk to be
"verified by the evaluation judge rather than assumed", and it now has been.

### M3. Backend service (`documentation-agent` repository, D2)

FastAPI wrapper around the core package, per [web delivery plan §3.1](docs-agent-web-delivery.md).

Work items:

1. Repository skeleton: `app/main.py`, `Dockerfile`, `README.md`, CI.
2. `POST /chat` — request: message history (client-held, no server session
   store); response: server-sent events — `text` deltas, `status` events
   while a search runs ("Searching documentation…"), one final `sources`
   event, then `done`.
3. Streaming tool loop: add a `run_turn_streaming` generator to
   `mat3ra_docs_agent.loop`, and a `stream()` method on `Provider`
   implemented by both adapters, so the CLI and service share one loop.
4. `GET /health` for the runtime probe.
5. Guards, all request-tested: CORS allowlist (`https://docs.mat3ra.com`,
   localhost origins for development), per-IP token-bucket rate limit
   (in-process is acceptable at beta scale; note it resets on scale-to-zero),
   caps on message count and body size per request, the existing 8-iteration
   tool bound, and a per-conversation output-token ceiling.
6. Structured request logs per D7: latency, tool calls, token usage, stop
   reason — the observability list from [web delivery plan §6](docs-agent-web-delivery.md).

Acceptance: `docker run` locally with ADC answers a question end-to-end with
visible streaming; a scripted client verifies each guard (rejected origin,
rate-limit 429, oversized body 413).

### M4. Documentation widget — **done 2026-08-01**

Live on the deploy preview and covered by 17 Playwright tests
(`tests/widget/`) that run in CI in under three seconds without cloud access
or a model call — the widget is real, only the service is faked at the
network boundary.

Four things the first real use taught, each now a test:

- **Citations must be clickable and same-tab.** The model lists sources as
  bare URLs, which the renderer did not recognise, so every citation arrived
  as dead text.
- **Emphasised product terms should link**, from a glossary the service
  derives from its own index — never from the model. Terms that more than one
  page claims are dropped: a confident link to the wrong product's page is
  worse than bold text.
- **Citations must stay on the build being read.** The corpus stores
  canonical production URLs, so following one from a preview left the preview
  — and the conversation with it, storage being per-origin.
- **The conversation has to outlive the page.** Once links open in place,
  every citation ended the exchange that produced it. It is now stored,
  bounded and expiring, with "New chat" to end it.

The remaining scope note stands: the site count has grown past the four in
`AGENTS.md` — CI now builds eight (adding Interface,
Resources, Developers, Command Line, Standards), so verify the widget against
the workflow's list rather than a remembered number.

Work items:

1. New assets, self-hosted (no CDN):

   ```
   lang/en/docs/extra/js/docs-agent.js        # launcher, panel, SSE client, renderer
   lang/en/docs/extra/css/docs-agent.css
   lang/en/docs/extra/js/vendor/              # marked + DOMPurify, pinned versions
   ```

   `docs-agent.js` is written as a framework-free embeddable module —
   `DocsAgent.mount(element, {endpoint, tokenProvider})`, themed through CSS
   custom properties, no MkDocs assumptions — so the platform surface (M8)
   reuses it through a thin wrapper rather than a rewrite.

2. Wire into `mkdocs-base.yml` (`extra_javascript`, `extra_css`). All four
   site configs `INHERIT` the base, so this is a single edit — verify each
   built site picks it up rather than editing four files.
3. Behaviour: floating "Ask AI" launcher; panel with conversation held in
   memory only; streamed Markdown rendered incrementally and sanitised
   (DOMPurify) — model output is never injected as raw HTML; searching
   indicator driven by `status` events; `sources` rendered as links; footer
   with the D7 disclosure and an escalation link to support.
4. Endpoint constant in `docs-agent.js` (D4 URL), with a `localStorage`
   override for local development against `localhost`. If the endpoint is
   unreachable or CORS-blocked (e.g. Netlify deploy previews), the launcher
   hides — the widget must never break a documentation page.
5. Keyboard and mobile pass: focus trap in the panel, Escape closes,
   usable at phone widths.

Acceptance: `./scripts/serve-all.sh` + local service answers with citations
from any page of all four sites; `scripts/links/check-links.py` still passes;
widget absent-but-silent when the service is down; the module also mounts in
a bare HTML page with a single `mount()` call (the M8 embeddability check).

### M5. Deployment and index pipeline — **done 2026-07-31**

Live at `https://docs-agent-mmrcocqy3a-uc.a.run.app` (D4: the default Cloud
Run hostname for the beta). The Cloud Run choice paid off exactly where §5
said it would — the attached service account supplies Vertex credentials, so
the pasted access token that development needed is not managed, it is gone.

Two identities, deliberately separate: the runtime holds only Vertex access,
and the deploy identity may act as it without inheriting anything from it.
CI authenticates through Workload Identity Federation, so no service-account
key exists in either place.

A revision deploys with **no traffic** behind a `candidate` tag, is
smoke-tested on its own URL for health and one real end-to-end question, and
only then takes traffic. A broken revision never gets the chance to serve.

Verified against the deployed service, not locally: health reports the
documentation commit its index was built from; an anonymous request streams a
grounded answer; the CORS allowlist admits the documentation origin and
refuses another; an oversized body is rejected; and the rollback drill ran end
to end — promote, roll back to the previous revision, roll forward — with the
traffic split confirmed at each step.

Three things worth carrying forward:

- **`git clone --branch` cannot take a commit SHA.** Pinning the index to a
  documentation commit failed outright until the build was changed to fetch
  the ref and check out `FETCH_HEAD`. Pinning is the whole point of the
  artifact, so this would have silently degraded to "whatever `main` was".
- **`builds submit --tag` cannot pass a build argument**, which the pinned
  build needs; an explicit build config replaces it.
- **A brand-new project needs a moment.** The first `run deploy --source`
  failed with a bare permission error that resolved itself once the freshly
  created Artifact Registry repository and its permissions had propagated —
  worth knowing before chasing an org policy that is not the cause.

The original plan for this milestone follows, for the reasoning behind the
shape above.

Cloud Run runtime plus the two decoupled triggers from
[web delivery plan §5.1](docs-agent-web-delivery.md).

Work items:

1. One-time cloud setup (D3): runtime service account with Vertex model
   access and read access to the index bucket, nothing else; Workload
   Identity Federation for both repositories' GitHub Actions — no key files
   anywhere; budget on the project — **done 2026-07-31**: $100/month,
   alerts at 50/80/100%, and the console's native spend cap (pauses
   services on breach) configured. Costs are recorded with up to ~24 hours
   of lag, so the cap is a backstop, not burst protection: Cloud Run
   `--max-instances` times the per-request token caps (M3.5) still bounds
   the worst-case burn rate, and Vertex per-model quotas can be lowered as
   a second bound.
2. Documentation trigger — small workflow in this repository: on push to
   `main` touching `lang/en/docs/**`, fire a `repository_dispatch` carrying
   the documentation SHA. It runs no ingestion; under D6 all agent logic
   lives in the service repository.
3. Service pipeline (service repository): on dispatch or own-repo push,
   check out the documentation at that SHA, ingest, build the image
   **baking in** the resulting index and the documentation SHA, deploy to a
   staging revision, smoke-test (`/health` plus one golden question), then
   promote. Rollback = redeploy the previous image, which carries its own
   index.
4. Runtime settings: scale-to-zero, small instance, concurrency tuned for
   SSE; request timeout above the slowest multi-search answer observed.

Acceptance: a trivial documentation edit on `main` propagates to a redeployed
service without manual steps; rollback drill performed once; spend alert
fires on a test threshold.

### M6. Launch hardening

Gate on all of: D7 signed off, D8 thresholds met on the golden set
(including ≥ 90% correct behaviour on the unanswerable subset), M3 guard
tests green, M5 rollback drill done.

Work items:

1. Decide and publish the privacy note (widget footer; optionally a short
   documentation page — which adds a `mkdocs.yml` nav entry in the same
   change, per repository convention).
2. Re-run the full answer-quality evaluation against the production
   endpoint, not just locally.
3. Enable the widget on production by shipping the `mkdocs-base.yml` change
   (until then, the widget branch stays unmerged — the docs deploy on push
   to `main` via `s3-deploy.yml`, so merging is launching).
4. Soft launch: announce internally, watch logs and spend for a week, then
   announce publicly.

### M7. Post-launch retrieval upgrades (quality track)

In the order and for the reasons given in [RAG plan §4.3](docs-agent-rag.md),
every step gated on the M2 harness: inline `--8<--` ESSE includes; contextual
retrieval; embeddings + hybrid search (behind the same `Retriever.search`
interface — no service change); `get_page` tool; reranking only if the
numbers justify it; model-tier comparison for cost (D5).

### M8. In-platform surface (platform.mat3ra.com)

The second surface from [web delivery plan §2.2](docs-agent-web-delivery.md). The platform
reuses the deployed service and the embeddable widget; retrieval, the agent
loop, and model credentials never enter the platform application (rejected in
[web delivery plan §2.1](docs-agent-web-delivery.md)).

Reuse boundaries:

- **Backend — reused as deployed.** The platform calls the same service and
  `/chat` contract; there is no second deployment and nothing is ported to
  Node. The browser talks to the service directly — the platform never
  proxies the SSE stream (Meteor methods are RPC; the streaming mismatch was
  §2.1's decisive row). Service change: the platform origin joins the CORS
  allowlist.
- **Frontend — reused as a module.** A thin React wrapper (a ref plus
  `DocsAgent.mount()`, ~20 lines) hosts the M4 widget inside the platform
  shell. The service serves its own built copy of the bundle
  (`GET /widget.js`, copied from this repository during the M5 image build),
  so the client the platform loads is version-locked to the API it calls; a
  pinned vendored copy in the platform repository is the fallback if loading
  a service-hosted script is unwanted there.
- **Deliberately not reused:** no Vertex credentials in the platform, and no
  platform-action tools in M8 itself — those are specified in
  [`docs-agent-platform-actions.md`](docs-agent-platform-actions.md) behind
  their own security review.

Stages, each independently shippable:

1. **M8.1 — anonymous embed (1–2 days, platform repository).** A
   feature-flagged launcher mounts the widget against the production
   endpoint. Platform users are treated like documentation visitors
   (per-IP limits). Can ship any time after M6.
2. **M8.2 — user identity via OIDC (1–2 days, mostly service-side).** The
   platform already authenticates through OpenID Connect, so no token
   endpoint is built: `tokenProvider` returns the signed-in user's ID
   token, and the service validates it against the identity provider's
   published keys (JWKS), checking audience and expiry — no shared secrets
   to provision or rotate. Verified callers switch from per-IP to
   per-account rate limits, with user context logged. Extends D7 —
   retention for identified questions must be decided before M8.2 ships.
   This identity gate is what the platform-actions capability
   ([`docs-agent-platform-actions.md`](docs-agent-platform-actions.md))
   builds on.
3. **M8.3 — context hints (~1 day).** The wrapper passes the current platform
   view (route or screen name) as a request field folded into the prompt, so
   answers orient to where the user is. Client-supplied hints only — no
   privileged data path.

Acceptance: M8.1 answers with citations inside the platform behind the flag;
under M8.2, two accounts on one address get independent rate budgets while
anonymous callers stay IP-limited; the same widget keeps working unchanged
on docs.mat3ra.com throughout.

---

## 5. Change inventory by location

| Location | Changes |
| --- | --- |
| This repository (public) | Widget assets + `mkdocs-base.yml` wiring (M4); documentation-merge trigger (M5.2); privacy page if chosen (M6). The superseded Phase-0 demo still sits in `scripts/rag/` |
| Service repository ([`documentation-agent`](https://github.com/mat3ra/documentation-agent), private) | Core package (M1, done); eval harness (M2); FastAPI app, streaming loop, Dockerfile, guards, deploy pipeline (M3, M5.3); serves the widget bundle, verifies platform tokens, per-account limits (M8) |
| Platform repository (`web-app`, existing) | React wrapper + feature flag (M8.1); OIDC token wiring (M8.2); context hints (M8.3) |
| Google Cloud (one-time) | Service account, WIF, index bucket, budget alert, Cloud Run service (M5.1) |

## 6. Execution risks

Strategy risks live in the companions ([RAG plan §8](docs-agent-rag.md),
[web delivery plan §6](docs-agent-web-delivery.md)); these are risks to the execution:

- **The public endpoint exists before launch** (M5 precedes M6). Keep the
  staging service unlisted, CORS-locked, and rate-limited from its first
  deploy; the widget merge, not the service deploy, is the launch event.
- **Model deprecation on Vertex.** The pinned id will eventually retire, and
  one default (`gemini-3.1-pro-preview`) is explicitly a preview. The M2
  harness is the safety net — upgrade is a config change plus an evaluation
  run, never a silent bump. Model availability is also region-specific
  (Gemini 3.x is `global`-only today), so region and model move together.
- **Golden-set staleness.** Documentation moves; expected-URL entries rot.
  The retrieval evaluation doubles as the detector (a moved page drops
  recall), and D7 logs supply replacement questions.
- **Single-maintainer bandwidth.** Milestones are cut to merge
  independently: each of M1–M5 leaves `main` shippable, and the plan
  survives being picked up and put down between sessions.

## 7. Immediate next actions

M1–M5 are done and the agent is deployed and answering. Only the launch gate
remains, and most of what is left is judgement rather than code.

1. **Merge the open pull requests.** They are stacked and merge in order:
   `documentation-agent` #1 (M1) → #2 (M2) → #3 (M3) → #4 (M5);
   `documentation` #391 after #389.
2. **D7, the retention decision** (owner). It gates M6 and nothing else is
   blocking it. The widget footer already discloses that questions are
   logged, so the text and the policy need to agree before anyone sees it.
3. ~~Settle the faithfulness measurement~~ — **settled 2026-08-01.** Repeated
   runs exposed a judge defect (it scored against a truncated view of the
   evidence); with the corrected judge, faithfulness is 1.00 in both runs.
   The quality half of the M6 gate is met; what remains of M6 is D7 and the
   merge itself.
4. **Two secrets to add:** `DOCS_AGENT_DISPATCH_TOKEN` in this repository, so
   a documentation merge triggers a rebuild; the pipeline skips with a
   message until then, rather than failing the build.
5. **The build machine's gcloud is sorted — the story is worth recording.**
   The failures were three stacked causes, not one: the machine driving
   builds (Mat3rium) is a different computer from the laptop whose logins
   kept "not helping"; its 2023-era gcloud minted tokens Google began
   rejecting outright on 2026-08-01; and its account session now demands
   interactive reauthentication, which no non-interactive shell can
   satisfy. Current state: a current SDK runs from a local directory, fed
   tokens minted from application-default credentials
   (`CLOUDSDK_AUTH_ACCESS_TOKEN`), which refresh fine — no user action
   needed per deploy. A proper `gcloud auth login` on Mat3rium plus a brew
   upgrade there would retire the workaround; deploys through CI (federated
   identity) bypass all of it, which is one more reason to merge the
   pipeline.
5. **Retire the superseded demo** in `scripts/rag/` so there is one
   implementation rather than two.
6. **Owner, when convenient:** enable the Claude models in Model Garden on
   `mat3ra-documentation` to unblock the `anthropic` backend for the D5
   comparison. Nothing is blocked on it — Gemini is the default and works.

Note what merging does and does not do. The widget only appears once the
service answers its health check, and the service is already live, so
**merging the widget to `main` is the launch** — which is why it waits on
M6 rather than on anything technical.
