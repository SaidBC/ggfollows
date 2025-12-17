"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useGetTasks } from "@/hooks/useGetTasks";
import { useUser } from "@/hooks/useUser";
import siteConfig from "@/lib/siteConfig";

export default function TasksLimit() {
  const { data, isLoading, error } = useUser();
  const { data: taskData } = useGetTasks({ userId: data?.id });
  if (error) return <p>Error loading user</p>;
  if (!isLoading && !data) return <p>Error loading user</p>;
  if (!taskData || !taskData.success || error)
    return <p>An Error occures durring fetching</p>;
  const user = data;
  const tasks = taskData.data;

  return (
    <Card className="max-w-100">
      <CardContent className="flex flex-col gap-1 bg-card rounded-2xl font-bold ">
        <div className="flex gap-2 items-center justify-between">
          <span>Active tasks :</span>
          <Badge>
            {tasks.total}/{siteConfig.TASK_ACTIVE_LIMITS[user?.plan || "FREE"]}
          </Badge>
        </div>
        <div className="flex gap-2 items-center justify-between">
          <span>Daily tasks :</span>
          <Badge>
            {user?.dailyTasksCreatedCount || 0}/
            {siteConfig.TASK_DAILY_LIMITS[user?.plan || "FREE"]}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
