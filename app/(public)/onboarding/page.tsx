import OnboardingCard from "@/ui/(public)/onboarding/OnboardingCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Your Onboarding – GGfollows",
  description:
    "Set up your GGfollows account in a few quick steps and start earning points, claiming rewards, and growing your social profiles faster.",
  openGraph: {
    title: "Complete Your Onboarding – GGfollows",
    description:
      "Finish onboarding to unlock your dashboard, tasks, daily rewards, and more.",
    url: "/onboarding",
  },
};

export default function Page() {
  return (
    <div className="py-24 px-6 mx-auto max-w-lg min-h-dvh">
      <OnboardingCard />
    </div>
  );
}
