import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBranch } from "../../services/branchApi";

export function useDelete() {
  const queryClient = useQueryClient();
  const { mutate: Delete, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteBranch(id),
    onSuccess: () => {
      toast.success("این نمائنده گی بطوری موفقانه حذب شد");
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { Delete, isDeleting };
}
