"use client";
import TaskCard from "./TaskCard";
import EmptyListMessage from "@/components/EmptyListMessage";
import { IconClipboardPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetTasks } from "@/hooks/useGetTasks";
import { useSession } from "next-auth/react";
import siteConfig from "@/lib/siteConfig";
import MainPagination from "@/components/MainPagination";
import { useSearchParams } from "next/navigation";
import TasksLimit from "../TasksLimit";

export default function YourTasksList() {
  const PAGE_PARAM = "user-tasks-page";
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get(PAGE_PARAM) ?? "0") || 1;
  const session = useSession();

  const { data, error, isLoading } = useGetTasks({
    userId: session.data?.user.id || undefined,
    page,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[140px] w-full rounded-2xl bg-muted/20 animate-pulse border border-border/50" />
        ))}
      </div>
    );
  }

  if (!data || !data.success || error)
    return <div className="p-8 text-center text-destructive">Error loading your tasks.</div>;

  const tasksData = data.data;
  const tasks = tasksData.tasks;
  const total = tasksData.total;
  const lastPage = Math.ceil(total / siteConfig.DEFAULT_LIMIT);

  if (total === 0) {
    return (
      <div className="py-12 flex justify-center w-full">
        <EmptyListMessage 
          className="bg-transparent border-none max-w-sm"
          title="No tasks created" 
          description="You haven't created any tasks yet. Start by creating your first task to grow your social presence!" 
          icon={<IconClipboardPlus size={80} strokeWidth={1} className="text-muted-foreground/20" />}
          action={
            <Button variant="secondary" asChild className="rounded-xl font-bold">
              <Link href="/tasks/create">Create new task</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <TasksLimit />
      
      <div className="grid grid-cols-1 gap-5">
        {tasks.map((task: any) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description || ""}
            complated={task._count.completions}
            max={task.quantity}
            icon={siteConfig.platforms[task.platform as keyof typeof siteConfig.platforms].icon}
            platformLink={task.link}
            amount={task.amount}
            id={task.id}
            view="CREATOR"
            creator={task.creator}
          />
        ))}
      </div>

      {lastPage > 1 && (
        <div className="flex justify-center pt-2">
          <MainPagination
            page={page}
            lastPage={lastPage}
            paramPage={PAGE_PARAM}
          />
        </div>
      )}
    </div>
  );
}
