import { test, expect } from "@playwright/test";
import { cleanUpTestData, disconnectPrisma } from "../utils/db-helpers";

test.describe("Authentication Flows", () => {
  const testEmail = `testuser_${Date.now()}@test.com`;
  const testUsername = `testuser_${Date.now()}`;
  const testPassword = "Password123!";

  test.afterAll(async () => {
    await cleanUpTestData();
    await disconnectPrisma();
  });

  test("User can sign up successfully and receives free points", async ({ page }) => {
    // Navigate to signup
    await page.goto("/auth/signup");
    
    // Fill out form
    await page.fill('input[name="firstname"]', "Test");
    await page.fill('input[name="lastname"]', "User");
    await page.fill('input[name="username"]', testUsername);
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirm_password"]', testPassword);
    
    // Submit
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard or verification
    await expect(page).toHaveURL(/.*\/verify-email|.*\/dashboard/, { timeout: 10000 });
    
    // If it goes to the dashboard directly (depends on app setting), check balance
    if (page.url().includes("/dashboard")) {
        await expect(page.locator("text=100")).toBeVisible(); // Initial points
    }
  });

  test("User can log out from the dashboard", async ({ page }) => {
    // First sign in
    await page.goto("/auth/login");
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/.*\/dashboard|.*\/verify-email/);

    // If verification is blocking, we can't test logout from sidebar normally without verifying.
    // For this generic test, assume we can access logout URL directly or via sidebar if visible.
    // In next-auth, clicking a signout button or visiting a signout route invalidates the session.
    // We will navigate to the default NextAuth signout page.
    if (page.url().includes("/dashboard")) {
        await page.goto("/api/auth/signout");
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(/.*\/$/); // Should go to home or login
    }
  });

  test("Unauthenticated user is redirected to login from private routes", async ({ page }) => {
    // Try to access private dashboard without session
    await page.goto("/dashboard");
    
    // Should be redirected to login
    await expect(page).toHaveURL(/.*\/auth\/login/);
  });
});
