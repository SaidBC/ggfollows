import { Badge } from "@/components/ui/badge";
import PointsIcon from "@/components/vectors/PointIcon";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import CheckTask from "./CheckTask";
import { Icon, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import DeleteTaskButton from "./DeleteTaskButton";

type TaskCardProps = {
  id: string;
  title: string;
  description?: string;
  amount: number;
  complated: number;
  max: number;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  platformLink: string;
  view: "CREATOR" | "CLIENT";
  creator: { username: string };
};

export default function TaskCard(task: TaskCardProps) {
  return (
    <div className="bg-card text-card-foreground flex flex-col md:flex-row justify-between rounded-xl border py-4 shadow-sm @container/card from-secondary/5 to-card dark:bg-card bg-linear-to-t px-4 ">
      <div className="flex flex-col md:flex-row md:items-center  gap-4">
        <div className="px-4 self-center py-2 md:py-0">
          <task.icon className="size-28 md:size-20" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{task.title}</h2>
          <p className="text-sm text-muted-foreground">{task.description}</p>
          {task.view === "CLIENT" && (
            <p className="text-sm text-secondary font-bold">
              @{task.creator.username}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-between md:flex-col-reverse gap-2">
        {task.view === "CLIENT" ? (
          <div className="flex md:flex-row-reverse flex-wrap items-center gap-4">
            <CheckTask taskId={task.id} />
            <Link
              className="flex items-center gap-1 text-sm hover:underline"
              href={task.platformLink}
            >
              <LinkIcon size={16} />
              <span className="">GO TO</span>
            </Link>
          </div>
        ) : (
          <div></div>
        )}
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2 items-center">
            <Badge className="bg-secondary">
              {task.complated}/{task.max}
            </Badge>
            {task.view === "CREATOR" && <DeleteTaskButton taskId={task.id} />}
          </div>
          <div className="text-secondary flex items-center gap-1">
            <span className="text-2xl font-bold">{task.amount}</span>
            <PointsIcon width={24} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
