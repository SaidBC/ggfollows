import { TasksWithCompletions } from "@/types";
import TaskCard from "./TaskCard";
import EmptyListMessage from "@/components/EmptyListMessage";
import { useGetTasks } from "@/hooks/useGetTasks";
import siteConfig from "@/lib/siteConfig";
import { useSearchParams } from "next/navigation";
import MainPagination from "@/components/MainPagination";

export default function TasksList() {
  const PAGE_PARAM = "tasks-page";
  const platforms = siteConfig.platforms;
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get(PAGE_PARAM) ?? "0") || 1;
  const { data, error } = useGetTasks({ userId: undefined, page });
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
          icon={platforms[task.platform].icon}
          platformLink={task.link}
          amount={task.amount}
          id={task.id}
          view={"CLIENT"}
          creator={task.creator}
        />
      ))}
      {tasks.total === 0 && (
        <EmptyListMessage
          title="No tasks available right now"
          description="Check back soon for new opportunities to earn points."
          className="@xl/main:flex-row @xl/main:text-left"
        />
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
