import { test, expect } from "@playwright/test";
import { ensureTestUser, cleanUpTestData, disconnectPrisma } from "../utils/db-helpers";

test.describe("Orders and Services", () => {
  const testEmail = `orderuser_${Date.now()}@test.com`;
  const testUsername = `orderuser_${Date.now()}`;
  const testPassword = "Password123!";

  test.beforeAll(async () => {
    await ensureTestUser(testEmail, testUsername, "USER");
  });

  test.afterAll(async () => {
    await cleanUpTestData();
    await disconnectPrisma();
  });

  test("User can navigate to New Order page", async ({ page }) => {
    // Login
    await page.goto("/auth/login");
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Navigate to Orders
    await page.goto("/orders");
    
    // Check that the Orders heading is present
    await expect(page.locator("h1:has-text('Orders')")).toBeVisible();
  });
});
