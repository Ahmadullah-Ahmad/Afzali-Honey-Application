import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteSpend } from "../../services/expendApi";

export function useDelete() {
  const queryClient = useQueryClient();
  const { mutate: Delete, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteSpend(id),
    onSuccess: () => {
      toast.success("این معلومات بطوری موفقانه حذب شد");
      queryClient.invalidateQueries({ queryKey: ["spends"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { Delete, isDeleting };
}
