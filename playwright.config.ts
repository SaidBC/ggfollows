import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    video: "on-first-retry",
    trace: "on-first-retry",
  },
  workers: 1, // Important: avoids race conditions with DB
  fullyParallel: false,
  reporter: [["list"], ["html"]],
  globalSetup: "./tests/global-setup.ts",
  globalTeardown: "./tests/global-teardown.ts",
});
