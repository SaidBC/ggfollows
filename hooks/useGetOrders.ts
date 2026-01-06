import apiTanstack from "@/lib/apiTanstack";
import { GetOrdersResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetOrders({
  userId,
  page,
}: {
  userId?: string;
  page?: number;
}) {
  const pageQuery = page ? `page=${page}` : "";
  const userIdQuery = userId ? `userId=${userId}` : "";
  const queries = `${userIdQuery}&${pageQuery}`;

  const url = `/orders?${queries}`;

  return useQuery({
    queryKey: ["orders", userId, page],
    queryFn: async () => {
      const data = await apiTanstack<GetOrdersResponse>(url);
      return data;
    },
    enabled: Boolean(userId),
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}
