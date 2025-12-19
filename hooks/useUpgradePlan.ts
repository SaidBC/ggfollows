"use client";

import apiAxios from "@/lib/apiAxios";
import { UpgradePlanResponse } from "@/types";
import { PlanType } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpgradePlan({
  plan,
  period,
}: {
  plan: PlanType;
  period: "month" | "year";
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await apiAxios.post<UpgradePlanResponse>(
        "/plans/upgrade?plan=" + plan + "&period=" + period
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["points", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
