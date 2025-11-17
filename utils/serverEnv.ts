import z from "zod";

const serverEnv = z.object({
  NEXTAUTH_URL: z.url(),
  NEXTAUTH_SECRET: z.string(),
});

export default serverEnv.parse({
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
});
