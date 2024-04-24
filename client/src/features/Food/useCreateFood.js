import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AddFood } from "../../services/foodApi";

export function useAddFood() {
  const { mutate: createFood, isPending: isAdding } = useMutation({
    mutationFn: ({ food }) => AddFood({ food }),
    onError: (err) => toast.error(err.message),
  });

  return { createFood, isAdding };
}
