import apiAxios from "@/lib/apiAxios";
import { GetUserMeResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await apiAxios.get<GetUserMeResponse>("/users/me");
      return res.data;
    },
  });
}
