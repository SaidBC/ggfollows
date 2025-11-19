import prisma from "@/lib/prisma";

export async function resetDb() {
  await prisma.pointTransaction.deleteMany();
  await prisma.user.deleteMany();
}
