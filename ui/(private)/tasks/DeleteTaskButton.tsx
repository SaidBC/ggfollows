"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { XIcon } from "lucide-react";
import { toast } from "sonner";

export default function DeleteTaskButton({ taskId }: { taskId: string }) {
  const { mutate, isPending } = useDeleteTask({ taskId });
  const onSubmit = function () {
    mutate(undefined, {
      onSuccess: (res) => {
        if (res.success) toast.success("Task deleted successfully!");
        else toast.error(res.errors.root?.message || "Failed to delete task.");
      },
    });
  };
  return (
    <Button
      size={"icon-sm"}
      onClick={onSubmit}
      variant={"destructive"}
      disabled={isPending}
    >
      {!isPending && <XIcon />}
      {isPending && <Spinner />}
    </Button>
  );
}
