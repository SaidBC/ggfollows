// utils/customPrismaAdapter.ts

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // Make sure this path is correct

// Define the fields you need to ensure are selected in every query.
// You must include all fields used in your callbacks.jwt.
const USER_FIELDS = {
  id: true,
  email: true,
  name: true,
  image: true,
  username: true, // <-- CRITICAL CUSTOM FIELD
  firstname: true, // <-- CRITICAL CUSTOM FIELD
  lastname: true, // <-- CRITICAL CUSTOM FIELD
  role: true, // <-- CRITICAL CUSTOM FIELD
  bio: true, // <-- CRITICAL CUSTOM FIELD
  emailVerified: true,
};

// Override the adapter methods that retrieve the user (getUser/getUserByEmail/etc.)
export function CustomPrismaAdapter(p: typeof prisma) {
  const adapter = PrismaAdapter(p);

  return {
    ...adapter,
    // The 'getUser' method is called by NextAuth when updating/refreshing the session
    async getUser(id) {
      const user = await p.user.findUnique({
        where: { id },
        select: USER_FIELDS,
      });
      return user;
    },

    // This method is called during initial sign-in via the token, ensure it selects fields
    async getUserByEmail(email) {
      const user = await p.user.findUnique({
        where: { email },
        select: USER_FIELDS,
      });
      return user;
    },

    // This is necessary if you use the session callback
    async getUserBySessionToken(sessionToken) {
      const session = await p.session.findUnique({
        where: { sessionToken },
        select: { user: { select: USER_FIELDS } },
      });
      return session?.user ?? null;
    },
  };
}
