import ComingSoonPage from "@/components/ComingSoonPage";
import PlansCards from "@/ui/(public)/plans/PlansCards";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Plans — GGfollows",
  description:
    "Explore GGfollows pricing plans and choose the right option for boosting your social media growth.",
  keywords: [
    "ggfollows plans",
    "pricing",
    "growth plans",
    "subscription",
    "social media boost plans",
  ],
  openGraph: {
    title: "Pricing & Plans — GGfollows",
    description:
      "Choose a plan that fits your needs and grow your accounts faster.",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      {/* <ComingSoonPage /> */}
      <div className="flex justify-center items-center text-center">
        <PlansCards />
      </div>
    </div>
  );
}
