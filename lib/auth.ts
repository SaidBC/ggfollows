import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import serverEnv from "@/utils/serverEnv";
import clientEnv from "@/utils/clientEnv";
import prisma from "./prisma";

// Set default URL for NextAuth to avoid warnings
process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3001";

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
    // Add OAuth providers (commented out until you configure them with proper credentials)
    /* 
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    */
  ],
  callbacks: {
    async jwt({ token, user }) {
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
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: serverEnv.NEXTAUTH_SECRET,
  // Add cookie settings for better security and cross-domain support in production
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
