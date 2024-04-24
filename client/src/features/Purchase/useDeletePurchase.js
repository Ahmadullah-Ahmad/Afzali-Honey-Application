import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deletePurchase } from "../../services/purchaseApi";

export function useDelete() {
  const queryClient = useQueryClient();
  const { mutate: Delete, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deletePurchase(id),
    onSuccess: () => {
      toast.success("این جنس بطوری موفقانه تعغیر شد");
      queryClient.invalidateQueries({ queryKey: ["purchase"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { Delete, isDeleting };
}
