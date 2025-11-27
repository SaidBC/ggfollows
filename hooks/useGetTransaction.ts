import apiTanstack from "@/lib/apiTanstack";
import { GetTransactionsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetUserTransactions({ userId }: { userId?: string }) {
  const url = `/transactions?userId=${userId}`;
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const data = await apiTanstack<GetTransactionsResponse>(url);
      return data;
    },
    enabled: Boolean(userId),
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}
