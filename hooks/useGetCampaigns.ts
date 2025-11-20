import apiTanstack from "@/lib/apiTanstack";
import { GetCampaignsResponse } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetCampaings() {
  return useSuspenseQuery({
    queryKey: ["rewards", "campaigns"],
    queryFn: async () => {
      const data = await apiTanstack<GetCampaignsResponse>(
        "/rewards/campaigns"
      );
      return data;
    },
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}
