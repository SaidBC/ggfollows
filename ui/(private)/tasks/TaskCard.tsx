"use client";
import { Badge } from "@/components/ui/badge";
import PointsIcon from "@/components/vectors/PointIcon";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import CheckTask from "./CheckTask";
import { Icon, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import DeleteTaskButton from "./DeleteTaskButton";
import { cn } from "@/lib/utils";
import { IconExternalLink, IconProgressCheck, IconUser } from "@tabler/icons-react";

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
  const progress = (task.complated / task.max) * 100;
  
  return (
    <div className="group relative overflow-hidden bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-5 hover:bg-card/60 transition-all duration-300 shadow-sm hover:shadow-secondary/5 hover:border-secondary/20 flex flex-col sm:flex-row gap-6">
      {/* Platform Icon Section */}
      <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-muted/20 text-secondary border border-border/50 group-hover:scale-105 transition-transform duration-300">
        <task.icon size={44} strokeWidth={1.5} />
      </div>

      {/* Content Section */}
      <div className="flex-grow flex flex-col justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-foreground group-hover:text-secondary transition-colors line-clamp-1">
              {task.title}
            </h2>
            {task.view === "CREATOR" && (
              <Badge variant="outline" className="text-[10px] font-bold py-0 h-4 border-secondary/20 text-secondary">
                YOUR TASK
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed max-w-xl">
            {task.description || "Complete this task to earn points instantly."}
          </p>
          
          {task.view === "CLIENT" && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-secondary/70">
              <IconUser size={12} />
              <span>@{task.creator.username}</span>
            </div>
          )}
        </div>

        {/* Progress & Stats Row */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <div className="flex flex-col gap-1.5 min-w-[140px]">
            <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <IconProgressCheck size={12} className="text-secondary" />
                <span>Completion</span>
              </div>
              <span className="text-foreground">{task.complated} / {task.max}</span>
            </div>
            <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden border border-border/50">
              <div 
                className="h-full bg-linear-to-r from-secondary/80 to-secondary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">Reward</span>
              <div className="flex items-center gap-1 text-secondary">
                <span className="text-xl font-black tabular-nums">{task.amount}</span>
                <PointsIcon width={20} height={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-3 pt-4 sm:pt-0 sm:pl-4 border-t sm:border-t-0 sm:border-l border-border/50">
        {task.view === "CLIENT" ? (
          <>
            <CheckTask taskId={task.id} />
            <Link
              className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground hover:text-secondary transition-colors uppercase tracking-widest py-2 px-3 hover:bg-secondary/5 rounded-lg"
              href={task.platformLink}
              target="_blank"
            >
              <IconExternalLink size={14} />
              <span>Visit</span>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <DeleteTaskButton taskId={task.id} />
          </div>
        )}
      </div>
    </div>
  );
}
