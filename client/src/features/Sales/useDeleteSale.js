import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteSales } from "../../services/SalesApi";

export function useDelete() {
  const queryClient = useQueryClient();
  const { mutate: saleDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteSales(id),
    onSuccess: () => {
      toast.success("این جنس بطوری موفقانه حذب شد");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });
  return { saleDelete, isDeleting };
}
