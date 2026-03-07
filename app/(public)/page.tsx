import HeroSection from "@/ui/(public)/Home/HeroSection";
import HowItWorksSection from "@/ui/(public)/Home/HowItWorksSection";
import FaqSection from "@/ui/(public)/Home/FaqSection";

import { Metadata } from "next";
import clientEnv from "@/utils/clientEnv";

export const metadata: Metadata = {
  title: "GGfollows — Free Followers & Social Media Growth Platform",
  description:
    "Boost your social presence with GGfollows, the premier social media growth platform. Get free followers, likes, and subscribers through our organic follow for follow engagement exchange.",
  keywords: [
    "free followers",
    "social media growth platform",
    "follow for follow",
    "free instagram followers",
    "free tiktok followers",
    "youtube subscribers exchange",
    "social media engagement",
    "grow social media followers",
    "organic social media growth",
    "GGfollows",
  ],
  openGraph: {
    title: "GGfollows — Free Followers & Social Media Growth Platform",
    description:
      "Join our community for organic social media growth. Earn points and get free followers across Instagram, TikTok, YouTube, and more.",
    url: clientEnv.NEXT_PUBLIC_URL,
    siteName: "GGfollows",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GGfollows — Free Followers & Social Media Growth Platform",
    description:
      "Grow your social media presence organically with our real engagement exchange platform.",
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
