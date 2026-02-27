import { test, expect } from "@playwright/test";
import {  cleanUpTestData, disconnectPrisma, createTestTask, createTestUser } from "../utils/db-helpers";
import { fillLoginForm } from "../utils/test-helpers";

test.describe("Task Creation and Management", () => {
  const testEmail1 = `creator@test.com`;
  const testUsername1 = `creator`;
  
  const testEmail2 = `completer@test.com`;
  const testUsername2 = `completer`;
  
  const testPassword = "Password123!";

  test.beforeAll(async () => {
    // We need a user to create tasks, and another user to complete them.
    await createTestUser(testEmail1, testUsername1, "USER"); // Creator
    await createTestUser(testEmail2, testUsername2, "USER"); // Completer
  });

  test.afterAll(async () => {
    await cleanUpTestData();
    await disconnectPrisma();
  });

  test("User can navigate to Tasks page and create a new task successfully", async ({ page }) => {
    // Login as User 1
    await page.goto("/auth/login");
    await fillLoginForm(page, testEmail1, testPassword);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*\/dashboard/);
    
    // Navigate to Create Task
    await page.goto("/tasks");
    await expect(page).toHaveURL(/.*\/tasks/);
    
    // Choose to add a new task. Assuming there's a button or tab for this.
    // If it's the "Manage Tasks" or "Create Task" area, navigate there
    await page.goto("/tasks/create");
    
    // Fill the add task form
    await page.fill('input[id="title"]', "My Awesome E2E Task");
    await page.fill('textarea[id="description"]', "Please complete this to verify the E2E test.");
    
    // Select platform (FACEBOOK is default or we can just open it)
    await page.click('button[role="combobox"]');
    await page.click('div[role="option"]:has-text("Youtube")');
    
    await page.fill('input[id="link"]', "https://youtube.com/test");
    await page.fill('input[id="quantity"]', "5"); // 5 completions
    await page.fill('input[id="amount"]', "10"); // 10 points each
    
    // Submitting costs points (5 * 10 = 50 points)
    await page.click('button:has-text("Launch Task")');

    // Wait for success toast
    await expect(page.locator("text=Task created successfully!")).toBeVisible();
  });
});
