import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteSave } from "../../services/KeepApi";

export function useDelete() {
  const queryClient = useQueryClient();
  const { mutate: Delete, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteSave(id),
    onSuccess: () => {
      toast.success("این معلومات بطوری موفقانه حذب شد");
      queryClient.invalidateQueries({ queryKey: ["keeps"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { Delete, isDeleting };
}
