"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { XIcon } from "lucide-react";

export default function DeleteTaskButton({ taskId }: { taskId: string }) {
  const { mutate, isPending } = useDeleteTask({ taskId });
  const onSubmit = function () {
    mutate();
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
