// prisma/seed.ts
import prisma from "@/lib/prisma";
import siteConfig from "@/lib/siteConfig";
import bcrypt from "bcrypt";

async function seedDefaultServices() {
  const { SERVICES } = siteConfig;

  for (const service of SERVICES) {
    await prisma.service.upsert({
      where: { code: service.code }, // MUST be unique
      update: {
        name: service.name,
        platform: service.platform,
        pricePerUnit: service.pricePerUnit,
        minQuantity: service.minQuantity,
        maxQuantity: service.maxQuantity,
        isActive: true,
      },
      create: service,
    });
  }

  console.log("✅ Services seeded");
}

async function  SeedTestUser() {
  const password = await bcrypt.hash("test1235", 10);
  await prisma.user.create({
    data: {
      email: "test1235@test.com",
      name: "elon musk",
      password: password,
    },
  });
    console.log("✅ Test user seeded");

}

async function main() {
  await SeedTestUser()
  await seedDefaultServices();
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
