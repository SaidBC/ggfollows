import { Page } from "@playwright/test";
import { PrismaClient, TaskPlatform, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

/**
 * Creates a test user with a specific password and role.
 */
export async function createTestUser(email: string, username?: string, role: Role = "USER") {
  const password = await bcrypt.hash("Password123!", 10);
  
  return prisma.user.create({
    data: {
      email,
      username,
      password,
      role,
      points: 1000, // Give them some starting points for tests
      emailVerified: new Date(),
    },
  });
}

/**
 * Ensures a test user exists, creating it if it doesn't.
 */
export async function ensureTestUser(email: string, username: string, role: Role = "USER") {
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await createTestUser(email, username, role);
  } else {
    // Reset state for tests
    user = await prisma.user.update({
      where: { email },
      data: { role, points: 1000 }
    });
  }
  return user;
}

/**
 * Creates a test task for testing workflows.
 */
export async function createTestTask(userId: string, title: string = "Test Follow Task") {
  return prisma.task.create({
    data: {
      userId,
      title,
      description: "Test description",
      platform: "X",
      link: "https://x.com/test",
      quantity: 10,
      amount: 100, // Points per completion
    },
  });
}

/**
 * Clears specific test data to avoid polluting the DB.
 */
export async function cleanUpTestData() {
  await prisma.pointTransaction.deleteMany({
    where: { 
      user: { email: { endsWith: "@test.com" } }
    }
  });
  await prisma.taskCompletion.deleteMany({
    where: {
      user: { email: { endsWith: "@test.com" } }
    }
  });
  await prisma.task.deleteMany({
    where: {
      creator: { email: { endsWith: "@test.com" } }
    }
  });
  await prisma.order.deleteMany({
    where: {
      user: { email: { endsWith: "@test.com" } }
    }
  });
  await prisma.supportTicket.deleteMany({
    where: {
      user: { email: { endsWith: "@test.com" } }
    }
  });
  // Delete test users last
  await prisma.user.deleteMany({
    where: { email: { endsWith: "@test.com" } }
  });
}

// Ensure the connection is closed when imported in node scripts
export async function disconnectPrisma() {
    await prisma.$disconnect();
}


