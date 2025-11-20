import apiTanstack from "@/lib/apiTanstack";
import { GetTransactionsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const data = await apiTanstack<GetTransactionsResponse>("/transactions");
      return data;
    },
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}
