import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AddPurchase } from "../../services/purchaseApi";

export function useAddPurchase() {
  const { mutate: addNewPurchase, isPending: isAdding } = useMutation({
    mutationFn: ({ purchase }) => AddPurchase({ purchase }),
    onError: (err) => toast.error(err.message),
  });

  return { addNewPurchase, isAdding };
}
