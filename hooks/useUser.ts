import apiAxios from "@/lib/apiAxios";
import { GetUserMeResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await apiAxios.get<GetUserMeResponse>("/users/me");
      if (!res.data.success) {
        throw new Error(
          res.data.errors.root?.message || "Failed to fetch user"
        );
      }
      return res.data.data;
    },
  });
}
