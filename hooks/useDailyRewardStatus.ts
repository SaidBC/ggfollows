import apiTanstack from "@/lib/apiTanstack";
import { GetDailyRewardStatusResponse } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useDailyReward() {
  return useSuspenseQuery({
    queryKey: ["rewards", "daily", "status"],
    queryFn: async () => {
      const data = await apiTanstack<GetDailyRewardStatusResponse>(
        "/rewards/daily/status"
      );
      return data;
    },
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}
