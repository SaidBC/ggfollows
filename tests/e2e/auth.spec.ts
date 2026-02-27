import { test, expect } from "@playwright/test";
import { createTestUser, cleanUpTestData,disconnectPrisma } from "../utils/db-helpers";
import { fillLoginForm } from "../utils/test-helpers";


test.describe("Authentication Flows", async () => {
  const testEmail = `test1@test.com`;
  const testUsername = `test1`;
  const testPassword = "Password123!";

  test.afterAll(async () => {
    await cleanUpTestData();
    await disconnectPrisma();
  });

  // test("User can sign up successfully and receives free points", async ({ page }) => {
  //   // Navigate to signup
  //   await page.goto("/auth/signup");
    
  //   // Fill out form
  //   await page.fill('input[name="firstname"]', "Test");
  //   await page.fill('input[name="lastname"]', "User");
  //   await page.fill('input[name="username"]', testUsername);
  //   await page.fill('input[name="email"]', testEmail);
  //   await page.fill('input[name="password"]', testPassword);
  //   await page.fill('input[name="confirm_password"]', testPassword);
  //   await page.check("#acceptedTerms");

  //   // Submit
  //   await page.click('button[type="submit"]');

  //   // Wait for redirect to dashboard or verification
  //   await expect(page).toHaveURL(/.*\/verify-email|.*\/dashboard/, { timeout: 10000 });
    
  //   // If it goes to the dashboard directly (depends on app setting), check balance
  //   if (page.url().includes("/dashboard")) {
  //       await expect(page.locator("text=+20")).toBeVisible(); // Initial points
  //   }
  // });

  // test("User can log out from the dashboard", async ({ page }) => {
  //   // First sign in
  //   await page.goto("/auth/login");
  //   await fillLoginForm(page, testEmail, testPassword);
  //   await page.screenshot({path:"filled_login.png",fullPage:true})
  //   await page.click('button[type="submit"]');
  //   await page.screenshot({path:"login.png",fullPage:true})
    
  //   await expect(page).toHaveURL(/.*\/dashboard|.*\/verify-email/);

  //   // If verification is blocking, we can't test logout from sidebar normally without verifying.
  //   // For this generic test, assume we can access logout URL directly or via sidebar if visible.
  //   // In next-auth, clicking a signout button or visiting a signout route invalidates the session.
  //   // We will navigate to the default NextAuth signout page.
  //   //   if (page.url().includes("/dashboard")) {
  //   //       await page.goto("/api/auth/signout");
  //   //       await page.click('button[type="submit"]');
  //   //       await expect(page).toHaveURL(/.*\/$/); // Should go to home or login
  //   //   }
  //   });

  // test("Unauthenticated user is redirected to login from private routes", async ({ page }) => {
  //   // Try to access private dashboard without session
  //   await page.goto("/dashboard");
    
  //   // Should be redirected to login
  //   await expect(page).toHaveURL(/.*\/auth\/login/);
  // });


  const test2Email = `test100@example.com`;
  const test2Password = "Password123!";
  test("user should redirect to onboarding if profile not completed", async ({ page }) => {
    await createTestUser(test2Email);
    await page.goto("/auth/login");
    await fillLoginForm(page, test2Email, test2Password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/onboarding");
    
  });
  test( "user should complete onboarding", async ({ page }) => {
    await page.goto("/auth/login");
    await fillLoginForm(page, test2Email, test2Password);
    await page.click('button[type="submit"]');
    await page.screenshot({path:"onboarding.png",fullPage:true})
    await page.fill('input[name="username"]', "test2");
    await page.fill('input[name="firstname"]', "test2");
    await page.fill('input[name="lastname"]', "test2");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/dashboard");
  });
});
