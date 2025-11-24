import apiTanstack from "@/lib/apiTanstack";
import { GetTasksResponse } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetTasks({ creator }: { creator?: string }) {
  const query = creator ? `creator=${creator}` : "";

  return useSuspenseQuery({
    queryKey: ["tasks", query],
    queryFn: async () => {
      const data = await apiTanstack<GetTasksResponse>(`/tasks?${query}`);
      return data;
    },
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}
