import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteFood } from "../../services/foodApi";

export function useDelete() {
  const queryClient = useQueryClient();
  const { mutate: Delete, isPending: isDeleting } = useMutation({
    mutationFn: (item) => deleteFood(item),
    onSuccess: () => {
      toast.success("این معلومات بطوری موفقانه حذب شد");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });
  return { Delete, isDeleting };
}
