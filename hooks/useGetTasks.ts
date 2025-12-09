import apiTanstack from "@/lib/apiTanstack";
import { GetTasksResponse } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetTasks({
  userId,
  page,
}: {
  userId?: string;
  page?: number;
}) {
  const pageQuery = page ? `page=${page}` : "";
  const userIdQuery = userId ? `userId=${userId}` : "";
  const queries = `${userIdQuery}&${pageQuery}`;

  return useSuspenseQuery({
    queryKey: ["tasks", queries],
    queryFn: async () => {
      const data = await apiTanstack<GetTasksResponse>(`/tasks?${queries}`);
      return data;
    },
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}
