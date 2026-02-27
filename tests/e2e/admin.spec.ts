import { test, expect } from "@playwright/test";
import { ensureTestUser, cleanUpTestData, disconnectPrisma } from "../utils/db-helpers";
import { fillLoginForm } from "../utils/test-helpers";

test.describe("Admin Panel Protection", () => {
  const adminEmail = `adminuser_${Date.now()}@test.com`;
  const adminUsername = `adminuser_${Date.now()}`;
  
  const normalEmail = `normaluser_${Date.now()}@test.com`;
  const normalUsername = `normaluser_${Date.now()}`;
  
  const testPassword = "Password123!";

  test.beforeAll(async () => {
    await ensureTestUser(adminEmail, adminUsername, "ADMIN");
    await ensureTestUser(normalEmail, normalUsername, "USER");
  });

  test.afterAll(async () => {
    await cleanUpTestData();
    await disconnectPrisma();
  });

  test("Non-admin user cannot access admin routes", async ({ page }) => {
    // Login as normal user
    await page.goto("/auth/login");
    await fillLoginForm(page, normalEmail, testPassword);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Attempt to navigate to admin route
    await page.goto("/admin/overview");
    
    // Should be redirected back to dashboard or home, OR show access denied
    // GGfollows redirects non-admins away from /admin
    await expect(page).not.toHaveURL(/.*\/admin\/overview/);
  });

  test("Admin user can access admin routes", async ({ page }) => {
    // Login as admin user
    await page.goto("/auth/login");
    await fillLoginForm(page, adminEmail, testPassword);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Navigate to admin route
    await page.goto("/admin/overview");
    
    // Should be allowed to view the admin overview containing stats
    await expect(page).toHaveURL(/.*\/admin\/overview/);
    await expect(page.locator("text=Admin Overview")).toBeVisible();
  });
});
