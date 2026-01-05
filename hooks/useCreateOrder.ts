"use client";

import apiAxios from "@/lib/apiAxios";
import { CreateOrderResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createOrder(data: any) {
  const res = await apiAxios.post<CreateOrderResponse>("/orders", data);

  return res.data;
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
