import CardsSection from "@/ui/(private)/dashboard/CardsSection";
import TableSection from "@/ui/(private)/dashboard/TableSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — GGfollows",
  description:
    "View your points balance, daily rewards, task activity, and account analytics on your GGfollows dashboard.",
  keywords: [
    "ggfollows dashboard",
    "user dashboard",
    "social media growth panel",
    "points dashboard",
  ],
  openGraph: {
    title: "Dashboard — GGfollows",
    description: "Manage your account, points, and tasks all in one place.",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <CardsSection />
          <TableSection />
        </div>
      </div>
    </div>
  );
}
