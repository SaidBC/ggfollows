import prisma from "@/lib/prisma";

export async function resetDb() {
  // Delete in order to respect foreign key constraints
  await prisma.pointTransaction.deleteMany();
  await prisma.taskCompletion.deleteMany();
  // Tasks are connected to users
  await prisma.task.deleteMany();
  // Orders are connected to services and users
  await prisma.order.deleteMany();
  // Payments are connected to users
  await prisma.payment.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.rewardCampaign.deleteMany();
  
  // NextAuth related models
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  
  // Finally delete all users
  await prisma.user.deleteMany();
  await prisma.verificationToken.deleteMany();
}
