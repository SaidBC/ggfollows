"use client";

import apiAxios from "@/lib/apiAxios";
import { CheckTaskResponse, DeleteTaskResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTask({ taskId }: { taskId: string }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await apiAxios.delete<DeleteTaskResponse>("/tasks/" + taskId);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["points"] });
      queryClient.invalidateQueries({ queryKey: ["user", "points"] });
    },
  });
}
