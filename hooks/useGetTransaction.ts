import apiTanstack from "@/lib/apiTanstack";
import { GetTransactionsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetUserTransactions({
  userId,
  page,
}: {
  userId?: string;
  page?: number;
}) {
  const pageQuery = page ? `page=${page}` : "";
  const userIdQuery = userId ? `userId=${userId}` : "";
  const queries = `${userIdQuery}&${pageQuery}`;

  const url = `/transactions?${queries}`;

  return useQuery({
    queryKey: ["transactions", userId, page],
    queryFn: async () => {
      const data = await apiTanstack<GetTransactionsResponse>(url);
      return data;
    },
    enabled: Boolean(userId),
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}
