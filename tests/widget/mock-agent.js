/**
 * The agent service, faked at the network boundary.
 *
 * The widget is tested against canned responses rather than the deployed
 * service: a test that calls a language model is neither deterministic nor
 * free, and what is under test here is the widget's behaviour, not the
 * model's. The service's own behaviour is covered by its Python suite.
 */

const GLOSSARY = {
  "materials bank": "https://docs.mat3ra.com/materials/bank/",
  "materials designer": "https://docs.mat3ra.com/materials-designer/overview/",
};

/** An answer body, as the service streams it. */
function sse(events) {
  return events.map(([name, data]) => `event: ${name}\ndata: ${JSON.stringify(data)}\n\n`).join("");
}

const DEFAULT_ANSWER = sse([
  ["status", { message: "Searching the documentation", query: "materials bank" }],
  ["text", { text: "## Importing\n\nUse the **Materials Bank** or the " }],
  ["text", { text: "**Materials Designer**. Bold **Second unit (NSCF):** is not a term.\n\n" }],
  ["text", { text: "1. Open the bank\n2. Copy the material\n\n```bash\nqstat\n```\n\n" }],
  ["text", { text: "Sources:\n\n- https://docs.mat3ra.com/materials/bank/\n" }],
  ["sources", { urls: ["https://docs.mat3ra.com/materials/bank/"] }],
  ["done", {}],
]);

/**
 * Route the widget's calls to `https://agent.test`.
 *
 * @param {import('@playwright/test').Page} page
 * @param {{healthy?: boolean, answer?: string}} options
 */
async function mockAgent(page, options = {}) {
  const healthy = options.healthy !== false;
  const answer = options.answer || DEFAULT_ANSWER;

  await page.route("https://agent.test/health", (route) =>
    healthy
      ? route.fulfill({ status: 200, contentType: "application/json", body: '{"status":"ok"}' })
      : route.abort()
  );

  await page.route("https://agent.test/glossary", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ terms: GLOSSARY }),
    })
  );

  await page.route("https://agent.test/chat", (route) =>
    route.fulfill({ status: 200, contentType: "text/event-stream", body: answer })
  );
}

module.exports = { mockAgent, sse, GLOSSARY };
