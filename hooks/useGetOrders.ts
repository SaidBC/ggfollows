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
  console.log("Fetching orders with URL:", url);

  return useQuery({
    queryKey: ["orders", userId, page],
    queryFn: async () => {
      try {
        const data = await apiTanstack<GetOrdersResponse>(url);
        console.log(data);
        return data;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}
