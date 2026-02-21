"use client";

import { Task, TaskPlatform } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ExternalLink, Users, Trash2, CheckCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import siteConfig from "@/lib/siteConfig";

interface AdminTaskTableProps {
  tasks: (Task & { creator: { username: string | null }, _count: { completions: number } })[];
  onDelete: (id: string) => void;
}

export default function AdminTaskTable({ tasks, onDelete }: AdminTaskTableProps) {
  const getPlatformIcon = (platform: TaskPlatform) => {
    const p = siteConfig.platforms[platform];
    if (p) return <p.icon size={14} className="opacity-70" />;
    return <CheckCircle2 size={14} />;
  };

  return (
    <div className="bg-card/40 backdrop-blur-xl border border-border/20 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-border/10 hover:bg-transparent">
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">Task Title / Creator</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">Progress</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">Platform</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12 text-right">Points</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="border-border/10 hover:bg-white/5 transition-colors group">
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5 text-foreground border border-white/5 group-hover:border-secondary/30 transition-colors shadow-lg">
                    {getPlatformIcon(task.platform)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-foreground tracking-tight underline decoration-secondary/30 underline-offset-2 truncate max-w-[200px]">
                        {task.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-bold opacity-60">
                        by @{task.creator.username || "unknown"}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex flex-col gap-1.5 w-32">
                   <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                      <span>Progress</span>
                      <span>{task._count.completions} / {task.quantity}</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="h-full bg-secondary shadow-[0_0_10px_rgba(255,107,0,0.5)] transition-all duration-500" 
                        style={{ width: `${Math.min(100, (task._count.completions / task.quantity) * 100)}%` }}
                      />
                   </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest px-2 py-0 border bg-white/5 text-muted-foreground border-white/10">
                  {task.platform}
                </Badge>
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <div className="flex flex-col items-end gap-1">
                    <div className="font-black text-xs italic tracking-tighter text-foreground">
                        {task.amount} pts
                    </div>
                    <div className="text-[9px] text-muted-foreground font-bold opacity-40">
                        per completion
                    </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/5 rounded-lg">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card/90 backdrop-blur-xl border-border/20 rounded-xl">
                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Manage Task</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem onClick={() => window.open(task.link, "_blank")} className="text-xs focus:bg-white/5">
                      <ExternalLink className="mr-2 h-3.5 w-3.5" /> View Link
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-xs text-rose-500 focus:bg-rose-500/10 focus:text-rose-500 font-bold">
                      <Trash2 className="mr-2 h-3.5 w-3.5" /> Remove Task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
