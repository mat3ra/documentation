const { defineConfig, devices } = require("@playwright/test");

const PORT = Number(process.env.PORT || 4173);
const baseURL = `http://localhost:${PORT}`;

module.exports = defineConfig({
  testDir: __dirname,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], baseURL } },
  ],
  webServer: {
    command: `node ${__dirname}/server.js`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    env: { PORT: String(PORT) },
  },
});
