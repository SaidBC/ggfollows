import HeroSection from "@/ui/(public)/Home/HeroSection";
import HowItWorksSection from "@/ui/(public)/Home/HowItWorksSection";
import FaqSection from "@/ui/(public)/Home/FaqSection";

import { Metadata } from "next";
import clientEnv from "@/utils/clientEnv";

export const metadata: Metadata = {
  title: "GGfollows — Grow Your Social Media Faster with Real Engagement",
  description:
    "GGfollows helps creators grow their social media accounts through task-based engagement. Earn points, complete tasks, and claim rewards to boost your reach in a safe, fair, and transparent way.",
  keywords: [
    "social growth platform",
    "follow exchange",
    "boost social media",
    "gain followers",
    "engagement marketplace",
    "GGfollows",
  ],
  openGraph: {
    title: "GGfollows — Grow Your Social Media Faster",
    description:
      "Earn points, complete tasks, and boost your reach effortlessly with GGfollows.",
    url: clientEnv.NEXT_PUBLIC_URL,
    siteName: "GGfollows",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GGfollows — Grow Your Social Media Faster",
    description:
      "Earn points, complete tasks, and grow your social presence easily.",
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 flex flex-col gap-16 py-28 md:py-24">
      <HeroSection />
      <HowItWorksSection />
      <FaqSection />
    </div>
  );
}
