import { TasksWithCompletions } from "@/types";
import TaskCard from "./TaskCard";
import EmptyListMessage from "@/components/EmptyListMessage";
import { useGetTasks } from "@/hooks/useGetTasks";
import siteConfig from "@/lib/siteConfig";

export default function TasksList() {
  const platforms = siteConfig.platforms;
  const { data, error } = useGetTasks({ userId: undefined });
  if (!data || !data.success || error)
    return <p>An Error occures durring fetching</p>;
  const tasks = data.data;

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
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
      {tasks.length === 0 && (
        <EmptyListMessage
          title="No tasks available right now"
          description="Check back soon for new opportunities to earn points."
          className="@xl/main:flex-row @xl/main:text-left"
        />
      )}
    </div>
  );
}
