# Documentation Agent — Platform Actions Plan

Plan for letting the in-platform assistant execute actions for the user on
platform.mat3ra.com, built on the test-automation framework rather than a
separate action layer. Elaborates Phase 5 of the [RAG plan](docs-agent-rag.md)
and extends milestone M8 of the
[implementation plan](docs-agent-implementation.md).

- **Status:** Proposed — needs sign-off and a security review before build.
  Builds on the working experiment in
  [mat3ra/web-app#2894](https://github.com/mat3ra/web-app/pull/2894)
  (`experiment/mcp-server`).
- **Initiative phase:** 5, staged A1–A4 (numbering per the
  [implementation plan](docs-agent-implementation.md) §3). Throughout,
  "the platform repository" means `web-app` — the code behind
  platform.mat3ra.com.
- **Last updated:** 2026-07-31
- **Companion plans:** [`docs-agent-rag.md`](docs-agent-rag.md),
  [`docs-agent-web-delivery.md`](docs-agent-web-delivery.md),
  [`docs-agent-implementation.md`](docs-agent-implementation.md)

---

## 1. Principle

The agent may only do what the test suite can prove works, and only what the
signed-in user could do by hand. Concretely: the action vocabulary **is** the
Gherkin step library of the end-to-end tests, and execution happens **in the
user's own browser session**, so the platform's existing authorization
boundary is never widened.

## 2. What already exists (PR 2894 inventory)

The experiment branch in the platform repository contains a working desktop
prototype of exactly this capability:

| Piece | Contents | State |
| --- | --- | --- |
| `src/tests-cypress/` step definitions | Gherkin steps across ~30 domains (materials, jobs, workflows, billing, oidc, …) | In production CI use |
| [`@mat3ra/tede`](https://github.com/mat3ra/tede) | The test framework: Feature → Step → Widget/TAO → Browser → Driver layering; the Browser layer exists precisely so the driver (Cypress, Webdriver, Playwright) is swappable | Published, reused across projects |
| `src/mcp-server/` | `StepCatalog` (scans step definitions — 514 steps), `FeatureGenerator` (LLM → Gherkin with validation against the catalog), `runner` (executes `.feature` via Cypress CLI), LLM providers (Ollama, Gemini on Vertex) | Working |
| `src/mat3ra-agent-desktop/` | Electron shell: chat panel, embedded browser, `PlaywrightStepExecutor` over CDP, widget ports (`LoginPage`, `MaterialDesignerWidget`, …), step log, intent classification (chat vs automation) | Working locally |

Three things the experiment proves:

1. Natural language → **validated** Gherkin works: generation is constrained
   to catalog steps and rejected otherwise.
2. Steps are driver-portable: the desktop ported Cypress widgets to
   Playwright twice ("reuse cy steps with playwright"), confirming TeDe's
   Browser abstraction does its job.
3. Execution currently needs a privileged shell (Electron + CDP). Closing
   that gap — execution from a plain web page — is what this plan adds.

## 3. Execution model: in-page, in-session

Where should steps execute? The options:

| Option | Verdict |
| --- | --- |
| **In-page runner** in the user's session | **Chosen.** The user watches every step in their own tab; the user's session is the credential — nothing is delegated; nothing to install. Cypress is the existence proof: it already automates this application in-page with synthetic events, and the whole suite passes. |
| Server-side browser (Playwright) acting as the user | Rejected: requires session delegation to a server (credential custody, a new attack surface), invisible to the user, heavy to operate. |
| Browser extension / CDP | Rejected for the widget: install friction. CDP remains the desktop app's mechanism. |
| REST-API tools (the original Phase-5 sketch in the RAG plan) | Deferred, not rejected: robust for bulk/headless operations, but requires API-token custody at the service, bypasses the UI the user is trying to learn, and is not exercised by the UI test suite. Revisit after the UI-step path ships. |

The TeDe fit: implement a **DOM driver** for TeDe's Browser layer — the
third driver after Cypress and the desktop's Playwright. Widgets, TAOs¹ and
step definitions stay unchanged; the driver queries the live document and
dispatches events (with the known native-setter technique for React
controlled inputs, as Cypress does).

¹ TAOs are excluded from the agent surface entirely: they exist to seed test
data through privileged paths and have no business running in production.
The agent gets UI widgets only.

## 4. Architecture

```
platform.mat3ra.com (user signed in via OIDC)
│
│  Platform bundle ships: action runner = TeDe DOM driver + step executor
│  + step catalog (versioned with the app), exposed as window.Mat3raAgentRunner
│
└─ Ask AI widget (M8, service-served)
     │  POST /chat (SSE; OIDC ID token; client-held history;
     │             reports the runner's catalog version)
     ▼
   docs-agent service ── tools: search_docs | propose_actions
     ▼                              (validated against the reported catalog)
   Claude on Vertex
```

Components:

1. **Step-catalog artifact.** Built in the platform repository's CI from the step definitions
   (the MCP server's `StepCatalog` scan, made a build step): step name,
   parameters, domain, description, and a **mutation classification** (§5).
   Shipped inside the platform bundle and published for the service.
2. **Runner in the platform bundle, widget from the service.** The runner
   (DOM driver + executor + catalog) is platform code, versioned and deployed
   with the application — selectors, steps, and app can never skew. The chat
   widget stays service-served (M8) and talks to the runner through a small
   `window` API. The widget without the runner degrades to chat-only; the
   service validates plans against the catalog version the client reports.
3. **Planning in the service.** A `propose_actions` tool: the model drafts
   steps, the service validates them against the catalog (porting
   `FeatureGenerator`'s validation), invalid plans bounce back for repair.
   This is where the two workstreams converge: `search_docs` tells the agent
   *what* the procedure is (tutorials), the catalog tells it *how* to perform
   it (steps) — one grounded loop does both.
4. **Client-executed action protocol** on the existing stateless `/chat`:
   when the model calls `propose_actions`, the SSE stream ends with an
   `action_request` event carrying the validated plan. The widget renders the
   plan with mutating steps highlighted; the user confirms once per plan;
   the runner executes step-by-step with a live log and a stop button; the
   widget appends the structured results (per-step status, error, DOM
   context on failure) as the tool result in the client-held history and
   POSTs `/chat` again. The model then continues — explains, repairs the
   plan, or finishes. No server session state, exactly as in M3.

## 5. Safety model (input to the security review)

- **Vocabulary allowlist.** Only catalog steps can be planned (validated
  server-side) or executed (validated again by the runner). There is no
  free-form "evaluate JavaScript" or "click arbitrary selector" step.
- **Per-step classification**, stored in the catalog, human-reviewed:
  `read` (navigate, open, list, assert) runs unprompted once a plan is
  confirmed; `mutate` (create, edit, submit) requires the plan-level
  confirmation and is highlighted; `destructive-or-billing` (delete, purge,
  purchase, share outside the account) is **blocked in v1** — the agent
  explains the manual procedure with documentation citations instead.
- **Session boundary.** Everything runs as the signed-in user in their own
  tab; the service holds no platform credentials and cannot act when the
  user is absent. OIDC identity (M8.2) gates the capability: anonymous
  docs.mat3ra.com traffic never sees action tools.
- **Visible and interruptible.** Live step log in the widget, a stop button
  between steps, and per-step timeouts.
- **Prompt injection.** DOM-derived tool results (element text, entity
  names) re-enter the model and are treated as data; the vocabulary
  constraint bounds what a poisoned string can cause. Injection scenarios —
  e.g. a material named "ignore previous instructions…" — are an explicit
  security-review test case.
- **Audit.** Plan, confirmation, and per-step outcomes logged per account
  (extends decision D7).
- **Rollout.** Internal accounts → feature-flagged beta → general; the
  capability flag in service configuration is the kill switch.

## 6. The test framework as the quality loop

This is the reason to build actions on the test suite rather than beside it:

1. **Coverage by construction.** Every step the agent can execute is
   exercised by the E2E suite in the platform repository's CI. A step that starts failing in
   CI is pulled from the published catalog, and the agent degrades to
   instructions-with-citations for that capability instead of failing
   mid-action.
2. **Golden action set.** The action analog of the M2 golden questions:
   natural-language request → expected Gherkin plan → replay through the
   existing Cypress runner against a seeded environment in CI. Catches both
   planning regressions (prompt/model changes) and execution regressions
   (app changes).
3. **Cross-driver parity.** The same `.feature` must pass under the Cypress
   driver (CI) and the DOM driver (the widget runner, driven by Playwright
   in CI as the harness). Parity failures mean the DOM driver lies about a
   capability.
4. **New capabilities are test-driven.** Adding an agent skill = writing the
   step definitions, widgets, and tests first; the catalog regenerates; the
   agent can now plan with it. No agent-side code changes — the test suite
   is the agent's skill tree.
5. **The desktop app stays** as the step-development harness (interactive
   Playwright execution, step log) and a power-user tool. Optional later
   convergence: its planner calls the docs-agent service instead of local
   Gemini/Ollama, keeping one planning implementation.

## 7. Staging

Sequenced after M8.2 (OIDC identity at the service). Each stage shippable
alone.

| Stage | Scope | Where | Estimate |
| --- | --- | --- | --- |
| A1 | Catalog build step with classification; TeDe DOM driver MVP (navigate, open explorer, click widget control, fill field, assert visible) with cross-driver parity tests | platform repo, `tede` | 3–5 days |
| A2 | `propose_actions` + validation in the service; `action_request` protocol; capability flag, OIDC-gated | service repo, widget | 2–3 days |
| A3 | Widget action mode: plan preview, confirmation, live step log, stop; `read` steps first, then `mutate` | widget, platform repo (runner exposure) | 3–5 days |
| A4 | Golden action set in the platform repository's CI; audit logging; security review; internal beta | platform repo, service | 2–3 days + review |

## 8. Open decisions

1. **First domains.** Recommendation: materials and workflows, read-heavy
   steps first — they map directly onto the most-read tutorials.
2. **Classification ownership.** Who reviews and signs off the per-step
   `read`/`mutate`/`blocked` labels; CI should fail on unclassified steps.
3. **DOM driver home.** Recommendation: inside `@mat3ra/tede` next to the
   existing drivers, versioned with the steps that depend on it.
4. **Desktop convergence** on the service planner: worth doing, not urgent.
