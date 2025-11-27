import prisma from "@/lib/prisma";

async function generateUniqueUsername(
  email: string,
  maxAttempts = 5
): Promise<string> {
  let baseUsername = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
  if (baseUsername.length < 3) baseUsername = "user";
  let username = baseUsername;

  for (let i = 0; i < maxAttempts; i++) {
    const existingUser = await prisma.user.findUnique({
      where: { username: username },
      select: { id: true },
    });

    if (!existingUser) {
      return username;
    }
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    username = `${baseUsername}${randomSuffix}`;
  }
  return `user_${Date.now()}`;
}

export default generateUniqueUsername;
