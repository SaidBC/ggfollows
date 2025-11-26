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
    <div className="flex flex-1 flex-col ">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 lg:px-6 px-2">
          <AccountSettingsSection />
        </div>
      </div>
    </div>
  );
}
