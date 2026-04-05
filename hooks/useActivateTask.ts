import apiTanstack from "@/lib/apiTanstack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useActivateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      return await apiTanstack(`/tasks/${taskId}/activate`, "PATCH");
    },
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("Task reactivated successfully!");
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      } else {
        toast.error(data.errors?.root?.message || "Failed to reactivate task");
      }
    },
    onError: () => {
      toast.error("An error occurred. Please try again.");
    },
  });
}
