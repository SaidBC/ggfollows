import apiTanstack from "@/lib/apiTanstack";
import { GetServicesResponse } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetServices() {
  return useSuspenseQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const data = await apiTanstack<GetServicesResponse>("/services");
      return data;
    },
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}
