import CreateTaskSection from "@/ui/(private)/tasks/create/CreateTaskSection";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a Task — GGfollows",
  description:
    "Create a new task on GGfollows and offer rewards for users who complete actions to help grow your social account.",
  keywords: [
    "create task",
    "new task",
    "ggfollows create task",
    "task creation",
    "growth campaigns",
  ],
  openGraph: {
    title: "Create Task — GGfollows",
    description:
      "Set up a new task and boost your social media engagement through rewarded actions.",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="flex flex-1 flex-col ">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 lg:px-6 px-2">
          <CreateTaskSection />
        </div>
      </div>
    </div>
  );
}
