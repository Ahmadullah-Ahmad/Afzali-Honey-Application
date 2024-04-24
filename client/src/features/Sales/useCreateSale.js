import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AddSells } from "../../services/SalesApi";

export function useAddSells() {
  const { mutate: addNewSell, isPending: isAdding } = useMutation({
    mutationFn: ({ sells }) => AddSells({ sells }),
    onError: (err) => toast.error(err.message),
  });

  return { addNewSell, isAdding };
}
