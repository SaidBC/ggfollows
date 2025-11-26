import { LoginCard } from "@/ui/(public)/auth/LoginCard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login to GGfollows — Access Your Dashboard",
  description:
    "Sign in to your GGfollows account to manage tasks, track your points, claim rewards, and grow your social profiles efficiently.",
  keywords: [
    "ggfollows login",
    "sign in",
    "dashboard login",
    "social media growth account",
  ],
  openGraph: {
    title: "Login to GGfollows",
    description:
      "Access your GGfollows account to manage tasks, points, and rewards.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login to GGfollows",
    description: "Access your account dashboard.",
  },
};

export default function Page() {
  return (
    <>
      <LoginCard className="col-start-5 col-end-9" />
    </>
  );
}
