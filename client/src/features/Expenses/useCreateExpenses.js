import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AddSpend } from "../../services/expendApi";

export function useAddSpend() {
  const { mutate: addNewSpend, isPending: isAdding } = useMutation({
    mutationFn: ({ spend }) => AddSpend({ spend }),
    onError: (err) => toast.error(err.message),
  });

  return { addNewSpend, isAdding };
}
