#!/usr/bin/env node
/**
 * Static server for the widget tests.
 *
 * Serves the real widget assets from the repository, and synthesises a stub
 * documentation page for every other path. That second part matters: answers
 * cite canonical docs.mat3ra.com URLs which the widget rewrites onto the origin
 * being read, so the test needs every such path to resolve to a page that
 * mounts the widget again — that is precisely the navigation being tested.
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const PORT = Number(process.env.PORT || 4173);

const TYPES = { ".js": "text/javascript", ".css": "text/css" };

/**
 * Two ways to mount, because the widget supports two and they behave
 * differently: the documentation site lets the script mount itself only once
 * the service passes a health check, while the platform will mount it
 * explicitly. `?automount=1` exercises the first, the default the second.
 */
const PAGE = (pathname, autoMount) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Docs fixture ${pathname}</title>
  <link rel="stylesheet" href="/extra/css/docs-agent.css">
</head>
<body>
  <h1>Documentation fixture</h1>
  <p id="path">${pathname}</p>
  <div id="agent"></div>
${
  autoMount
    ? `  <script>localStorage.setItem("docsAgentEndpoint", "https://agent.test");</script>
  <script src="/extra/js/docs-agent.js"></script>`
    : `  <script>window.DOCS_AGENT_NO_AUTOMOUNT = true;</script>
  <script src="/extra/js/docs-agent.js"></script>
  <script>
    DocsAgent.mount(document.getElementById("agent"), {
      endpoint: "https://agent.test",
      docsOrigin: location.origin,
    });
  </script>`
}
</body>
</html>`;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  const pathname = url.pathname;

  if (pathname.startsWith("/extra/")) {
    const file = path.join(REPO_ROOT, pathname);
    if (fs.existsSync(file)) {
      response.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "text/plain" });
      response.end(fs.readFileSync(file));
      return;
    }
    response.writeHead(404).end("not found");
    return;
  }

  response.writeHead(200, { "Content-Type": "text/html" });
  response.end(PAGE(pathname, url.searchParams.get("automount") === "1"));
});

server.listen(PORT, () => console.log(`fixture server on http://localhost:${PORT}`));
