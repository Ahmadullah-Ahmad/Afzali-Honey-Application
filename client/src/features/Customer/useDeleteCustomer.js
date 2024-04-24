import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCustomer } from "../../services/customerApi";

export function useDelete() {
  const queryClient = useQueryClient();
  const { mutate: Delete, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteCustomer(id),
    onSuccess: () => {
      toast.success("این معلومات بطوری موفقانه حذب شد");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });
  return { Delete, isDeleting };
}
