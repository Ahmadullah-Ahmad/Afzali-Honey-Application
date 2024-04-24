import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editMeApi } from "../../services/AuthApi";
export function useChangeInfo() {
  const queryClient = useQueryClient();
  const { mutate: updateInfo, isPending: isUpdating } = useMutation({
    mutationFn: ({ data }) => editMeApi({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      toast.success("معلومت بطوری موفق‌ تعغیر شد ");
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateInfo, isUpdating };
}
