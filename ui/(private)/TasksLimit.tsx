"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useGetTasks } from "@/hooks/useGetTasks";
import { useUser } from "@/hooks/useUser";
import siteConfig from "@/lib/siteConfig";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function TasksLimit() {
  const [mounted, setMounted] = useState(false);
  const { data, isLoading, error } = useUser();
  const { data: taskData, isLoading: isTasksLoading } = useGetTasks({ userId: data?.id });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading || isTasksLoading) {
    return (
      <Card className="max-w-100 border-none bg-transparent shadow-none">
        <CardContent className="flex items-center justify-center h-20">
          <Spinner className="size-5 text-secondary/50" />
        </CardContent>
      </Card>
    );
  }

  if (error || !data || !taskData || !taskData.success) {
    return null; // Silent fail if data error, or show small error message
  }

  const user = data;
  const tasks = taskData.data;

  const activeLimit = siteConfig.TASK_ACTIVE_LIMITS[user?.plan || "FREE"];
  const dailyLimit = siteConfig.TASK_DAILY_LIMITS[user?.plan || "FREE"];

  return (
    <Card className="max-w-100 border border-secondary/20 bg-secondary/5 backdrop-blur-sm rounded-2xl overflow-hidden">
      <CardContent className="p-4 flex flex-col sm:flex-row gap-4 sm:gap-8 font-bold">
        <div className="flex flex-1 gap-3 items-center justify-between sm:justify-start">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Active Tasks</span>
          <Badge variant="secondary" className="rounded-lg font-black min-w-[3rem] justify-center">
            {tasks.total} / {activeLimit}
          </Badge>
        </div>
        <div className="hidden sm:block w-px h-8 bg-secondary/10" />
        <div className="flex flex-1 gap-3 items-center justify-between sm:justify-start">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Daily Tasks</span>
          <Badge variant="secondary" className="rounded-lg font-black min-w-[3rem] justify-center">
            {user?.dailyTasksCreatedCount || 0} / {dailyLimit}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
