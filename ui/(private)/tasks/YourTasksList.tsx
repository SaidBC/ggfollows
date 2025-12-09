import TaskCard from "./TaskCard";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconClipboardPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetTasks } from "@/hooks/useGetTasks";
import { useSession } from "next-auth/react";
import siteConfig from "@/lib/siteConfig";
import MainPagination from "@/components/MainPagination";
import { useSearchParams } from "next/navigation";

export default function YourTasksList() {
  const PAGE_PARAM = "user-tasks-page";
  const platform = siteConfig.platforms;
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get(PAGE_PARAM) ?? "0") || 1;

  const session = useSession();

  const { data, error } = useGetTasks({
    userId: session.data?.user.id || undefined,
    page,
  });
  if (!data || !data.success || error)
    return <p>An Error occures durring fetching</p>;
  const tasks = data.data;

  const lastPage = Math.ceil((tasks?.total || 0) / siteConfig.DEFAULT_LIMIT);

  return (
    <div className="flex flex-col gap-4">
      {tasks.tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description || ""}
          complated={task._count.completions}
          max={task.quantity}
          icon={platform[task.platform].icon}
          platformLink={task.link}
          amount={task.amount}
          id={task.id}
          view={"CREATOR"}
          creator={task.creator}
        />
      ))}
      {tasks.total === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconClipboardPlus />
            </EmptyMedia>
            <EmptyTitle>You haven't created any tasks yet</EmptyTitle>
            <EmptyDescription>
              Start by creating your first task to track and manage your growth.
            </EmptyDescription>
          </EmptyHeader>
          <div className="flex gap-2">
            <Button variant="secondary">
              <Link href={"/tasks/create"}>Create new task</Link>
            </Button>
          </div>
        </Empty>
      )}
      {Boolean(tasks.total) && (
        <MainPagination
          page={page}
          lastPage={lastPage}
          paramPage={PAGE_PARAM}
        />
      )}
    </div>
  );
}
