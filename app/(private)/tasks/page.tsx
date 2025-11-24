import TasksSection from "@/ui/(private)/tasks/TasksSections";
import YourTasksSection from "@/ui/(private)/tasks/YourTasksSection";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col ">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 lg:px-6 px-2">
          <YourTasksSection />
          <h1 className="font-bold text-3xl my-2 text-neutral-300">Tasks</h1>
          <TasksSection />
        </div>
      </div>
    </div>
  );
}
