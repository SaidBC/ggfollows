"use client";

import apiAxios from "@/lib/apiAxios";
import { UpdateUserResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUserRole({ userId }: { userId: string }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await apiAxios.patch<UpdateUserResponse>(
        "/users/" + userId,
        data
      );
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
