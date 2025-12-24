import ComingSoonPage from "@/components/ComingSoonPage";
import ServiceSwitcher from "@/ui/(public)/services/ServiceSwitcher";

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
      {/* <ComingSoonPage /> */}
      <div className="min-h-[calc(100dvh-var(--header-height)-var(--footer-height)-1px)] flex justify-center py-4">
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl my-2 text-neutral-300">
            Services :
          </h1>
          <ServiceSwitcher />
        </div>
      </div>
    </div>
  );
}
