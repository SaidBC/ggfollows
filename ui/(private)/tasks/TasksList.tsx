import { TasksWithCompletions } from "@/types";
import TaskCard from "./TaskCard";
import EmptyListMessage from "@/components/EmptyListMessage";
import { useGetTasks } from "@/hooks/useGetTasks";

export default function TasksList() {
  const { data, error } = useGetTasks({ creator: undefined });
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
          complated={task.__count.completions}
          max={task.quantity}
          srcImage=""
          platformLink={task.link}
          amount={task.amount}
          id={task.id}
          removeable={false}
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
