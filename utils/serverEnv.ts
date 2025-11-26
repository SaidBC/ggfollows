import z from "zod";

const serverEnv = z.object({
  GOOGLE_ID: z.string(),
  GOOGLE_SECRET: z.string(),
  EMAIL_USER: z.email(),
  EMAIL_PASS: z.string(),
  NEXTAUTH_URL: z.url(),
  NEXTAUTH_SECRET: z.string(),
});

export default serverEnv.parse({
  GOOGLE_ID: process.env.GOOGLE_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
});
