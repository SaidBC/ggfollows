"use client";

import apiAxios from "@/lib/apiAxios";
import { AdminPointsAdjustResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAdminAdjust() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { userId: string; points: number }) => {
      const res = await apiAxios.post<AdminPointsAdjustResponse>(
        "/points/admin-adjust",
        data
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
