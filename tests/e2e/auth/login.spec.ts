import { test, expect } from "@playwright/test";
import { createTestUser } from "../../utils/test-user";
import { resetDb } from "../../utils/reset-db";

test.beforeEach(async () => {
  await resetDb();
});

test("user can log in", async ({ page }) => {
  await createTestUser();

  await page.goto("/auth/login");

  await page.fill("#email", "test@example.com");
  await page.fill("#password", "Password123!");

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/dashboard/);
});
