import AccountSettingsSection from "@/ui/(private)/settings/AccountSettingsSection";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings — GGfollows",
  description:
    "Update your profile information, username, password, and account preferences on GGfollows.",
  keywords: [
    "ggfollows settings",
    "account settings",
    "profile settings",
    "update account",
  ],
  openGraph: {
    title: "Account Settings — GGfollows",
    description: "Manage and edit your GGfollows account information.",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="flex flex-1 flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-secondary/5 blur-[100px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      <div className="relative z-10 @container/main flex flex-1 flex-col">
        <div className="flex flex-col gap-8 py-8 md:gap-12 md:py-12 lg:px-12 px-4 max-w-7xl mx-auto w-full">
          <AccountSettingsSection />
        </div>
      </div>
    </div>
  );
}
