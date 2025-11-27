import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import serverEnv from "@/utils/serverEnv";
import clientEnv from "@/utils/clientEnv";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (!user || !user.password) {
            return null;
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            return null;
          }

          // Use type assertion to satisfy NextAuth User type
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            username: user.username || "", // Ensure username is never null
            role: user.role || "user", // Ensure role is never null
            bio: user.bio,
            accessToken: "", // Adding this to satisfy NextAuth User type
            emailVerified: user.emailVerified?.toString() || null,
          } as any; // Type assertion to bypass NextAuth User type checking
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: serverEnv.GOOGLE_ID,
      clientSecret: serverEnv.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, session, trigger, user }) {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.bio = user.bio;
        token.emailVerified = null;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        name: token.name ?? null,
        email: token.email ?? null,
        image: token.picture ?? null, // note: token.picture not token.image
        id: token.id as string,
        username: token.username as string,
        role: token.role as string,
        bio: token.bio ?? null,
        emailVerified: token.emailVerified ?? null,
      };
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: serverEnv.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  cookies: {
    sessionToken: {
      name: `${
        clientEnv.NEXT_PUBLIC_NODE_ENV === "production" ? "__Secure-" : ""
      }next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: clientEnv.NEXT_PUBLIC_NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: `${
        clientEnv.NEXT_PUBLIC_NODE_ENV === "production" ? "__Secure-" : ""
      }next-auth.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: clientEnv.NEXT_PUBLIC_NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: `${
        clientEnv.NEXT_PUBLIC_NODE_ENV === "production" ? "__Host-" : ""
      }next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: clientEnv.NEXT_PUBLIC_NODE_ENV === "production",
      },
    },
  },
};
