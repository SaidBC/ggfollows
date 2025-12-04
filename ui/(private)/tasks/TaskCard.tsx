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
    <div className="bg-card text-card-foreground flex flex-col @[48rem]/main:flex-row justify-between rounded-xl border py-4 shadow-sm @container/card from-secondary/5 to-card dark:bg-card bg-linear-to-t px-4 ">
      <div className="flex flex-col @[48rem]/main:flex-row @[48rem]/main:items-center gap-4 ">
        <div className="px-4 self-center py-2 @[48rem]/main:py-0">
          <task.icon className="size-28 @[48rem]/main:size-20" />
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
      <div className="flex justify-between @[48rem]/main:flex-col-reverse gap-2">
        {task.view === "CLIENT" ? (
          <div className="flex @[48rem]/main:flex-row-reverse items-center flex-wrap  gap-4">
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
