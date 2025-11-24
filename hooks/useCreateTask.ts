"use client";

import apiAxios from "@/lib/apiAxios";
import { CreateTaskResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createTask(data: any) {
  const res = await apiAxios.post<CreateTaskResponse>("/tasks", data);

  return res.data;
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["points", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
