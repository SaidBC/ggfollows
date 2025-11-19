import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function createTestUser(email = "test@example.com") {
  return prisma.user.create({
    data: {
      firstname: "John",
      lastname: "Doe",
      username: "testuser",
      email,
      password: await hash("Password123!", 10),
    },
  });
}
