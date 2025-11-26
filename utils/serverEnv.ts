import z from "zod";

const serverEnv = z.object({
  EMAIL_USER: z.email(),
  EMAIL_PASS: z.string(),
  NEXTAUTH_URL: z.url(),
  NEXTAUTH_SECRET: z.string(),
});

export default serverEnv.parse({
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
});
