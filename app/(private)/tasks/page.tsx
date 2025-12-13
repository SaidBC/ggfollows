import AdBanner from "@/components/AdBanner";
import TasksSection from "@/ui/(private)/tasks/TasksSections";
import YourTasksSection from "@/ui/(private)/tasks/YourTasksSection";
import clientEnv from "@/utils/clientEnv";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Tasks — GGfollows",
  description:
    "View and manage all the tasks you’ve created on GGfollows. Track progress, update tasks, and monitor performance.",
  keywords: [
    "ggfollows tasks",
    "manage tasks",
    "task list",
    "growth tasks",
    "user-created tasks",
  ],
  openGraph: {
    title: "Your Tasks — GGfollows",
    description: "See the tasks you've created and manage them easily.",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="flex flex-1 flex-col ">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="w-full py-4 justify-center flex">
          <AdBanner
            className=" @[728px]/main:w-[728px] @[728px]/main:h-[90px] @[468px]/main:w-[468px] @[468px]/main:h-[60px] w-[320px] h-[50px]"
            adConfigs={[
              {
                width: 728,
                height: 90,
                apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_720X90_API_KEY,
              },
              {
                width: 468,
                height: 60,
                apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_468X60_API_KEY,
              },
              {
                width: 320,
                height: 50,
                apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_320X50_API_KEY,
              },
            ]}
          />
        </div>
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 lg:px-6 px-2">
          <YourTasksSection />
          <h1 className="font-bold text-3xl my-2 text-neutral-300">Tasks</h1>
          <TasksSection />
        </div>
      </div>
    </div>
  );
}
