import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteProduct } from "../../services/ProductApi";

export function useDelete() {
  const queryClient = useQueryClient();
  const { mutate: Delete, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      toast.success("این جنس بطوری موفقانه حذب شد");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { Delete, isDeleting };
}
