import ServiceSwitcher from "@/ui/(public)/services/ServiceSwitcher";
import ServiceInfoSection from "@/ui/(public)/services/ServiceInfoSection";
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
    <div className="container mx-auto px-4 py-28 md:py-24">
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        {/* Page header */}
        <div className="flex flex-col gap-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 text-sm text-secondary font-medium w-fit">
            Marketplace
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Browse Services
          </h1>
          <p className="text-muted-foreground max-w-lg text-base leading-relaxed">
            Choose a platform and order followers, likes, or subscribers to grow
            your social media presence.
          </p>
        </div>

        {/* Service switcher */}
        <ServiceSwitcher />

        {/* Info Section */}
        <ServiceInfoSection />
      </div>
    </div>
  );
}
