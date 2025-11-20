"use client";

import apiAxios from "@/lib/apiAxios";
import { ClaimDailyRewardResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function claimDailyReward() {
  const res = await apiAxios.post<ClaimDailyRewardResponse>("/rewards/daily");
  if (!res.data.success) {
    throw new Error(res.data.errors.root || "Failed to claim daily reward");
  }
  return res.data.data;
}

export function useClaimDailyReward() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: claimDailyReward,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({
        queryKey: ["rewards", "daily", "status"],
      });
      queryClient.invalidateQueries({ queryKey: ["points", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
