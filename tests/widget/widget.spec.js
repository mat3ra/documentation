const { test, expect } = require("@playwright/test");
const { mockAgent, sse } = require("./mock-agent");

const LAUNCHER = ".docs-agent-launcher";
const PANEL = ".docs-agent-panel";
const MESSAGES = ".docs-agent-message";

async function ask(page, question = "How do I import a material?", expected = "Importing") {
  await page.click(LAUNCHER);
  await page.fill(".docs-agent-form input", question);
  await page.click(".docs-agent-form button[type=submit]");
  await expect(page.locator(MESSAGES).last()).toContainText(expected);
}

test.describe("mounting", () => {
  test("the launcher appears once the service answers its health check", async ({ page }) => {
    await mockAgent(page);
    await page.goto("/?automount=1");
    await expect(page.locator(LAUNCHER)).toBeVisible();
  });

  test("a documentation page is untouched when the service is unreachable", async ({ page }) => {
    // The widget must never leave a control that leads nowhere, and must never
    // break the page it is embedded in.
    await mockAgent(page, { healthy: false });
    await page.goto("/?automount=1");
    await page.waitForLoadState("networkidle");

    await expect(page.locator(LAUNCHER)).toHaveCount(0);
    await expect(page.locator("h1")).toContainText("Documentation fixture");
  });
});

test.describe("answers", () => {
  test.beforeEach(async ({ page }) => {
    await mockAgent(page);
    await page.goto("/");
  });

  test("markdown is rendered as structure, not as text", async ({ page }) => {
    await ask(page);
    const answer = page.locator(MESSAGES).last();

    await expect(answer.locator("h4, h3")).toHaveCount(1);
    await expect(answer.locator("ol li")).toHaveCount(2);
    await expect(answer.locator("pre code")).toContainText("qstat");
  });

  test("a search in progress is announced", async ({ page }) => {
    let release;
    const held = new Promise((resolve) => (release = resolve));
    await page.route("https://agent.test/chat", async (route) => {
      await held;
      route.fulfill({ status: 200, contentType: "text/event-stream", body: sse([["done", {}]]) });
    });

    await page.click(LAUNCHER);
    await page.fill(".docs-agent-form input", "anything");
    await page.click(".docs-agent-form button[type=submit]");
    await expect(page.locator(".docs-agent-status")).toBeVisible();
    release();
  });

  test("known product terms link to the page that defines them", async ({ page }) => {
    await ask(page);
    const term = page.locator("a.docs-agent-term", { hasText: "Materials Bank" });
    await expect(term).toHaveAttribute("href", /\/materials\/bank\/$/);
  });

  test("emphasis the glossary does not know stays plain", async ({ page }) => {
    // Over-linking is the failure mode here: a link to the wrong page looks
    // deliberate, so anything unrecognised must remain bold text.
    await ask(page);
    const answer = page.locator(MESSAGES).last();
    const plain = answer.locator("strong", { hasText: "Second unit (NSCF):" });

    await expect(plain).toHaveCount(1);
    await expect(plain.locator("a")).toHaveCount(0);
  });

  test("cited URLs are clickable", async ({ page }) => {
    await ask(page);
    const links = page.locator(`${MESSAGES} a`);
    expect(await links.count()).toBeGreaterThan(0);
  });

  test("links open in the same tab and look like links", async ({ page }) => {
    await ask(page);
    const link = page.locator(`${MESSAGES} a`).first();

    await expect(link).not.toHaveAttribute("target", "_blank");
    const colour = await link.evaluate((node) => getComputedStyle(node).color);
    expect(colour).not.toBe("rgb(0, 0, 0)");
  });

  test("citations stay on the documentation build being read", async ({ page }, testInfo) => {
    // The corpus stores canonical production URLs. On a preview or a local
    // build, following one verbatim would leave the site — and the stored
    // conversation, which is per-origin, behind with it.
    await ask(page);
    const hrefs = await page.locator(`${MESSAGES} a`).evaluateAll((nodes) =>
      nodes.map((node) => node.href)
    );

    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href.startsWith(testInfo.project.use.baseURL)).toBeTruthy();
    }
  });
});

test.describe("safety", () => {
  test("markup in an answer is shown, never executed", async ({ page }) => {
    const hostile = sse([
      [
        "text",
        {
          text:
            "Try <img src=x onerror=\"window.__pwned=1\"> and " +
            "<script>window.__pwned=1<\/script> plus [click](javascript:window.__pwned=1).",
        },
      ],
      ["done", {}],
    ]);
    await mockAgent(page, { answer: hostile });
    await page.goto("/");
    await ask(page, "anything", "onerror");

    expect(await page.evaluate(() => window.__pwned)).toBeUndefined();
    // The markup arrives as text rather than as nodes.
    await expect(page.locator(`${MESSAGES} img`)).toHaveCount(0);
    await expect(page.locator(MESSAGES).last()).toContainText("onerror");
  });

  test("a non-https link is not clickable", async ({ page }) => {
    const hostile = sse([
      ["text", { text: "See [the docs](javascript:alert(1)) for details." }],
      ["done", {}],
    ]);
    await mockAgent(page, { answer: hostile });
    await page.goto("/");
    await ask(page, "anything", "javascript:alert(1)");

    await expect(page.locator(`${MESSAGES} a`)).toHaveCount(0);
    await expect(page.locator(MESSAGES).last()).toContainText("javascript:alert(1)");
  });
});

test.describe("the conversation survives navigation", () => {
  test.beforeEach(async ({ page }) => {
    await mockAgent(page);
    await page.goto("/");
  });

  test("it is restored after a reload, with the panel still open", async ({ page }) => {
    await ask(page, "Where is the bank?");
    await page.reload();

    await expect(page.locator(PANEL)).toBeVisible();
    await expect(page.locator(MESSAGES)).toHaveCount(2);
    await expect(page.locator(MESSAGES).first()).toContainText("Where is the bank?");
  });

  test("following a citation keeps the exchange that produced it", async ({ page }) => {
    // The behaviour the whole session-storage feature exists for.
    await ask(page, "Where is the bank?");
    await page.locator(`${MESSAGES} a`).first().click();
    await page.waitForLoadState("load");

    expect(new URL(page.url()).pathname).toBe("/materials/bank/");
    await expect(page.locator(PANEL)).toBeVisible();
    await expect(page.locator(MESSAGES).first()).toContainText("Where is the bank?");
  });

  test("a closed panel stays closed across pages", async ({ page }) => {
    await ask(page);
    await page.click(".docs-agent-close");
    await page.reload();

    await expect(page.locator(LAUNCHER)).toBeVisible();
    await expect(page.locator(PANEL)).toBeHidden();
  });

  test("New chat ends it", async ({ page }) => {
    await ask(page);
    await page.click(".docs-agent-clear");

    await expect(page.locator(MESSAGES)).toHaveCount(1); // the greeting
    await page.reload();
    await expect(page.locator(MESSAGES)).toHaveCount(1);
  });

  test("a stale conversation is discarded rather than resurrected", async ({ page }) => {
    await ask(page);
    await page.evaluate(() => {
      const stored = JSON.parse(localStorage.getItem("docsAgentSession"));
      stored.updated = Date.now() - 8 * 24 * 60 * 60 * 1000; // older than the week-long limit
      localStorage.setItem("docsAgentSession", JSON.stringify(stored));
    });
    await page.reload();

    await expect(page.locator(MESSAGES)).toHaveCount(1);
    expect(await page.evaluate(() => localStorage.getItem("docsAgentSession"))).toBeNull();
  });

  test("the widget still works when storage is unavailable", async ({ page, context }) => {
    // Private browsing and hardened settings can make localStorage throw.
    await context.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        get() {
          throw new Error("storage disabled");
        },
      });
    });
    await page.goto("/");
    await ask(page);

    await expect(page.locator(MESSAGES).last()).toContainText("Importing");
  });
});
