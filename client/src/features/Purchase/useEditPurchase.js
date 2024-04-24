import { useMutation } from "@tanstack/react-query";
import { editPurchaseApi } from "../../services/purchaseApi";

export function useEditPurchase() {
  const { mutate: EditPurchase, isPending: isEditting } = useMutation({
    mutationFn: ({ data }) => editPurchaseApi({ data }),
  });

  return { EditPurchase, isEditting };
}
