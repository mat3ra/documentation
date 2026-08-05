# Ask AI widget — browser tests

Playwright tests for the documentation assistant widget
(`extra/js/docs-agent.js`).

```bash
cd tests/widget
npm install
npx playwright install chromium
npm test
```

## What is real and what is faked

The **widget is real** — the tests load the file the documentation site ships,
through a fixture page that mounts it the way the site does.

The **agent service is faked** at the network boundary (`mock-agent.js`). A test
that called a language model would be neither deterministic nor free, and what
is under test is the widget's behaviour, not the model's; the service is covered
by its own suite in the `documentation-agent` repository.

`server.js` synthesises a page for *every* path. Answers cite canonical
`docs.mat3ra.com` URLs which the widget rewrites onto the origin being read, so
following a citation has to land on a page that mounts the widget again — that
navigation is the thing several tests are about.

Both mounting styles are covered, because they differ: `?automount=1` loads the
page the way the documentation site does, where the widget only appears once the
service passes a health check; the default mounts explicitly, the way the
platform application will.

## What is covered

- **Mounting** — the launcher appears when the service is healthy, and a
  documentation page is left untouched when it is not.
- **Rendering** — Markdown becomes structure; searches are announced while they
  run.
- **Links** — cited URLs are clickable, known product terms link to the page
  that defines them, unknown emphasis stays plain, links open in the same tab
  and are coloured, and citations stay on the build being read.
- **Safety** — markup in an answer is displayed rather than executed, and a
  non-https link never becomes clickable.
- **The conversation** — it survives a reload and a followed citation, the panel
  reopens only if it was open, "New chat" ends it, a week-old conversation is
  discarded, and the widget still works where storage is unavailable.

## Keeping the suite honest

A green suite means nothing until it has been seen to fail. Both regressions
these tests were written for have been reintroduced deliberately and confirmed
to fail the run: restoring `target="_blank"` fails *links open in the same tab*,
and skipping session restoration fails *it is restored after a reload*. Do the
same when adding a test — break the behaviour first, watch it go red.
