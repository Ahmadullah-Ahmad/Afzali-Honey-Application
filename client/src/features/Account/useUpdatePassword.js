import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editPasswordApi } from "../../services/AuthApi";
export function useChangePassword() {
  const queryClient = useQueryClient();
  const { mutate: updatePassword, isPending: isUpdating } = useMutation({
    mutationFn: ({ data }) => editPasswordApi({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      toast.success("پسورد بطوری موفق‌ تعغیر شد ");
    },
    onError: (err) => toast.error(err.message),
  });
  return { updatePassword, isUpdating };
}
