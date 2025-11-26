import ComingSoonPage from "@/components/ComingSoonPage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services — GGfollows",
  description:
    "Discover the services offered by GGfollows, including engagement tools, points rewards, tasks, and growth campaigns.",
  keywords: [
    "ggfollows services",
    "growth services",
    "social media services",
    "engagement services",
  ],
  openGraph: {
    title: "Our Services — GGfollows",
    description:
      "Learn about the tools and services GGfollows provides to help grow your social presence.",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <ComingSoonPage />
    </div>
  );
}
