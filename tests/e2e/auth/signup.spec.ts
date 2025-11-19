import { test, expect } from "@playwright/test";
import { resetDb } from "../../utils/reset-db";
import { createTestUser } from "@/tests/utils/test-user";

test.beforeEach(async () => {
  await resetDb();
});

test("user can sign up successfully", async ({ page }) => {
  const email = `test${Date.now()}@example.com`;

  await page.goto("/auth/signup");

  await page.fill("#firstname", "John");
  await page.fill("#lastname", "Doe");
  await page.fill("#username", `user${Date.now()}`);
  await page.fill("#email", email);
  await page.fill("#password", "Password123!");
  await page.fill("#confirm_password", "Password123!");

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/dashboard/);
});

test("signup fails with duplicate email", async ({ page }) => {
  await createTestUser("duplicate@example.com");

  await page.goto("/auth/signup");

  await page.fill("#firstname", "John");
  await page.fill("#lastname", "Doe");
  await page.fill("#username", `user${Date.now()}`);
  await page.fill("#email", "duplicate@example.com");
  await page.fill("#password", "Password123!");
  await page.fill("#confirm_password", "Password123!");

  await page.click('button[type="submit"]');

  await page.screenshot({ path: "signup_diplicate_fails.png", fullPage: true });
  await expect(
    page.locator("text=User with this email or username already exists")
  ).toBeVisible();
});
