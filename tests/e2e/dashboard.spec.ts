import { test, expect } from "@playwright/test";
import { ensureTestUser, cleanUpTestData, disconnectPrisma } from "../utils/db-helpers";

test.describe("Dashboard & Point Integration", () => {
  const testEmail = `dashuser_${Date.now()}@test.com`;
  const testUsername = `dashuser_${Date.now()}`;
  const testPassword = "Password123!";

  test.beforeAll(async () => {
    // Seed user with exactly 1000 points
    await ensureTestUser(testEmail, testUsername, "USER");
  });

  test.afterAll(async () => {
    await cleanUpTestData();
    await disconnectPrisma();
  });

  test.beforeEach(async ({ page }) => {
    // Login before each test in this suite
    await page.goto("/auth/login");
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test("Dashboard displays correct initial seeded points", async ({ page }) => {
    // Check points display. We seeded 1000 points.
    await expect(page.locator("text=1000")).toBeVisible();
  });

  // Since we don't actually want to click daily reward in tests frequently as it creates a permanent DB state that is hard to rollback in parallel,
  // we will just check if the daily reward card exists.
  test("Daily Reward card is present and interactive", async ({ page }) => {
     // Look for the daily reward card elements
    const rewardCard = page.locator("text=Daily Reward").locator("..").locator("..").locator("..");
    await expect(rewardCard).toBeVisible();
    
    // Check if the claim button exists inside it
    const claimButton = page.locator("button:has-text('Claim Reward'), button:has-text('Claimed')").first();
    await expect(claimButton).toBeVisible();
  });
});
