"use client";
import EmptyListMessage from "@/components/EmptyListMessage";
import siteConfig from "@/lib/siteConfig";
import TaskCard from "./TaskCard";
import { IconTargetOff } from "@tabler/icons-react";
import { useGetTasks } from "@/hooks/useGetTasks";
import { useSearchParams } from "next/navigation";
import MainPagination from "@/components/MainPagination";

export default function TasksList() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "0") || 1;
  const { data, error, isLoading } = useGetTasks({ page });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[140px] w-full rounded-2xl bg-muted/20 animate-pulse border border-border/50" />
        ))}
      </div>
    );
  }

  if (!data || !data.success || error) {
    return <div className="p-8 text-center text-destructive">Error loading tasks. Please try again.</div>;
  }

  const tasks = data.data.tasks;
  const total = data.data.total;
  const lastPage = Math.ceil(total / siteConfig.DEFAULT_LIMIT);

  if (tasks.length === 0) {
    return (
      <div className="py-12 flex justify-center w-full">
        <EmptyListMessage 
          className="bg-transparent border-none max-w-sm"
          title="No tasks available" 
          description="There are no active tasks to complete at the moment. Check back later for new opportunities to earn points!" 
          icon={<IconTargetOff size={80} strokeWidth={1} className="text-muted-foreground/20" />}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-1 gap-5 w-full">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            amount={task.amount}
            complated={task._count.completions}
            icon={siteConfig.platforms[task.platform as keyof typeof siteConfig.platforms].icon}
            max={task.quantity}
            platformLink={task.link}
            title={task.title}
            description={task.description || undefined}
            view="CLIENT"
            creator={task.creator}
          />
        ))}
      </div>
      
      {lastPage > 1 && (
        <div className="flex justify-center pt-4">
          <MainPagination page={page} lastPage={lastPage} />
        </div>
      )}
    </div>
  );
}
