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

export default function YourTasksList() {
  const session = useSession();

  const { data, error } = useGetTasks({
    creator: session.data?.user.id || undefined,
  });
  console.log(data);
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
          removeable={true}
        />
      ))}
      {tasks.length === 0 && (
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
    </div>
  );
}
