import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  console.log(`Updating all tasks to expire at: ${thirtyDaysFromNow.toISOString()}`);

  const rolloutTime = new Date("2026-04-05T05:40:00Z"); // Approx time of this update

  const result = await prisma.task.updateMany({
    where: {
      createdAt: {
        lt: rolloutTime,
      },
      expiresAt: {
        lt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Less than 2 days (prevents re-bumping already migrated tasks)
      },
    },
    data: {
      expiresAt: thirtyDaysFromNow,
    },
  });

  console.log(`Updated ${result.count} tasks.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
