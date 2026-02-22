import { test, expect } from "@playwright/test";
import { ensureTestUser, cleanUpTestData, disconnectPrisma, createTestTask } from "../utils/db-helpers";
import { PrismaClient } from "@prisma/client";

test.describe("Task Creation and Management", () => {
  const testEmail1 = `taskuser1_${Date.now()}@test.com`;
  const testUsername1 = `taskuser1_${Date.now()}`;
  
  const testEmail2 = `taskuser2_${Date.now()}@test.com`;
  const testUsername2 = `taskuser2_${Date.now()}`;
  
  const testPassword = "Password123!";

  test.beforeAll(async () => {
    // We need a user to create tasks, and another user to complete them.
    await ensureTestUser(testEmail1, testUsername1, "USER"); // Creator
    await ensureTestUser(testEmail2, testUsername2, "USER"); // Completer
  });

  test.afterAll(async () => {
    await cleanUpTestData();
    await disconnectPrisma();
  });

  test("User can navigate to Tasks page and create a new task successfully", async ({ page }) => {
    // Login as User 1
    await page.goto("/auth/login");
    await page.fill('input[name="email"]', testEmail1);
    await page.fill('input[name="password"]', testPassword);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Navigate to Create Task
    await page.goto("/dashboard/tasks");
    
    // Choose to add a new task. Assuming there's a button or tab for this.
    // If it's the "Manage Tasks" or "Create Task" area, navigate there
    await page.goto("/dashboard/manage-tasks");
    
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
    await expect(page.locator("text=My Awesome E2E Task")).toBeVisible();
  });
});
