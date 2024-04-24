import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteUser } from "../../services/userApi";

export function useDelete() {
  const queryClient = useQueryClient();
  const { mutate: Delete, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      toast.success("معلومات کارمند بطوری موفقانه خذب شد");
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { Delete, isDeleting };
}
