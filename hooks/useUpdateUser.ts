"use client";

import apiAxios from "@/lib/apiAxios";
import { UpdateUserResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await apiAxios.patch<UpdateUserResponse>("/users/me", data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
