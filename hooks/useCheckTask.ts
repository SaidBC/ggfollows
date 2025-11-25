"use client";

import apiAxios from "@/lib/apiAxios";
import { CheckTaskResponse, UpdateUserResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCheckTask({ taskId }: { taskId: string }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await apiAxios.post<CheckTaskResponse>(
        "/tasks/" + taskId + "/check",
        data
      );
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["points"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
