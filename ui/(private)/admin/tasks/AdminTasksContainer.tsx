"use client";

import { useEffect, useState } from "react";
import apiAxios from "@/lib/apiAxios";
import { useSearchParams } from "next/navigation";
import MainPagination from "@/components/MainPagination";
import { Spinner } from "@/components/ui/spinner";
import EmptyListMessage from "@/components/EmptyListMessage";
import AdminTaskTable from "./AdminTaskTable";
import siteConfig from "@/lib/siteConfig";
import { toast } from "sonner";

export default function AdminTasksContainer() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "0") || 1;
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await apiAxios.get(`/tasks?page=${page}&admin=true`); // Pass admin flag
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      toast.error("Failed to load system tasks");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task? This action cannot be undone.")) return;
    
    try {
      const res = await apiAxios.delete(`/tasks/${id}`);
      if (res.data.success) {
        toast.success("Task removed successfully");
        fetchTasks();
      }
    } catch (error) {
      toast.error("Failed to remove task");
    }
  };

  if (isLoading && !data) {
    return <div className="py-20 flex justify-center"><Spinner className="size-16 text-secondary" /></div>;
  }

  const tasks = data?.tasks || [];
  const total = data?.total || 0;
  const lastPage = Math.ceil(total / siteConfig.DEFAULT_LIMIT);

  return (
    <div className="space-y-6">
      <div className="relative">
        {isLoading && data && (
          <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-[2rem]">
            <Spinner className="size-16 text-secondary" />
          </div>
        )}

        {tasks.length > 0 ? (
          <AdminTaskTable tasks={tasks} onDelete={handleDelete} />
        ) : (
          !isLoading && (
            <EmptyListMessage
              className="bg-card/20 border border-border/10 rounded-[2rem] p-12"
              title="No tasks found"
              description="No user-created tasks were found in the system."
            />
          )
        )}
      </div>

      <div className="flex justify-center pt-4">
        <MainPagination page={page} lastPage={lastPage} />
      </div>
    </div>
  );
}
