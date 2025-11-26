import { SignUpCard } from "@/ui/(public)/auth/SignUpCard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your GGfollows Account — Start Growing Today",
  description:
    "Join GGfollows for free and start earning points by completing tasks, gaining engagement, and boosting your social media presence.",
  keywords: [
    "ggfollows signup",
    "create account",
    "join platform",
    "social media growth signup",
  ],
  openGraph: {
    title: "Create Your GGfollows Account",
    description:
      "Sign up to earn points and grow your social media profiles effortlessly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Your GGfollows Account",
    description: "Join the platform and start growing your audience.",
  },
};

export default function Page() {
  return (
    <>
      <SignUpCard className="col-start-5 col-end-9" />
    </>
  );
}
