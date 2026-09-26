# Plans

Internal planning documents for work on this repository. These are **not part of
the published documentation site** — the MkDocs builds only read `lang/en/docs/`,
so nothing here appears on docs.mat3ra.com.

| Document | Scope | Status |
| --- | --- | --- |
| [`docs-agent-rag.md`](docs-agent-rag.md) | The documentation agent: retrieval-augmented generation over this repository's content. Strategy, corpus analysis, evaluation approach. | Active — Phase 0 of its content is built |
| [`docs-agent-web-delivery.md`](docs-agent-web-delivery.md) | Delivering that agent as a browser-based chat: architecture, hosting, repository layout, deployment. | Active — guides Phase 2 |
| [`docs-agent-implementation.md`](docs-agent-implementation.md) | Execution plan tying the others together: phases, milestones, file-level work items, acceptance criteria, decision register. | Active — the progression tracker (§3) |
| [`docs-agent-platform-actions.md`](docs-agent-platform-actions.md) | Letting the agent execute actions in the user's platform session: test-framework step reuse (Cypress/TeDe), in-page execution, safety model. | Proposed — needs sign-off + security review |

## Lifecycle

Documents and work progress separately:

- **Documents** carry a status — `Draft` (structure still moving), `Active`
  (agreed direction, guiding work), `Proposed` (needs sign-off before build),
  `Superseded` (kept for history) — and never move between folders, so
  cross-links stay stable and Git records the history.
- **Work** progresses by phase and milestone in the
  [implementation plan](docs-agent-implementation.md) §3 — the single
  tracker. A completed phase or milestone gets its State cell updated with
  the date and pull request.
- **Reviews are gates, not a folder:** open sign-offs live in the decision
  register (D2, D3, D7, D8), and Phase 5 additionally requires a security
  review before build.

The documents share one phase numbering (Phases 0–5), defined in the
[implementation plan](docs-agent-implementation.md) §3, and one vocabulary:
**the platform** is platform.mat3ra.com, whose repository is `web-app`;
**web delivery** is the browser chat for the documentation site.

The working implementation lives in the
[`documentation-agent`](https://github.com/mat3ra/documentation-agent)
repository (decision D6). The superseded Phase-0 prototype is still in
[`scripts/rag/`](../scripts/rag/) until that work is pushed.
