import { useMutation } from "@tanstack/react-query";
import { editSaleApi } from "../../services/SalesApi";

export function useEditSales() {
  const { mutate: EditSales, isPending: isEditting } = useMutation({
    mutationFn: ({ UpdatedData }) => editSaleApi({ data: UpdatedData }),
  });

  return { EditSales, isEditting };
}
