import apiAxios from "@/lib/apiAxios";
import apiTanstack from "@/lib/apiTanstack";
import { GetPointsBalanceResponse } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export function usePointsBalance() {
  return useSuspenseQuery({
    queryKey: ["points", "balance"],
    queryFn: async () => {
      const data = await apiTanstack<GetPointsBalanceResponse>(
        "/points/balance"
      );
      return data;
    },
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}
