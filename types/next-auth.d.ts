import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string | null;
      email: string | null;
      image: string | null;
      id: string;
      username: string;
      role: string;
      bio: string | null;
      emailVerified: string | null;
    };
  }

  interface User {
    id: string;
    username: string;
    role: string;
    bio: string | null;
    emailVerified: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role: string;
    bio: string | null;
    emailVerified: string | null;
  }
}
