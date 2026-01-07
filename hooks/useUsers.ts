import apiTanstack from "@/lib/apiTanstack";
import { GetUsersResponse } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetUsers({ page }: { page?: number }) {
  const pageQuery = page ? `page=${page}` : "";
  const queries = `${pageQuery}`;

  return useSuspenseQuery({
    queryKey: ["users", queries],
    queryFn: async () => {
      const data = await apiTanstack<GetUsersResponse>(`/users?${queries}`);
      return data;
    },
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}
