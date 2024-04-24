import { useMutation } from "@tanstack/react-query";
import { editProductApi } from "../../services/ProductApi";

export function useEditProduct() {
  const { mutate: EditProduct, isPending: isEditting } = useMutation({
    mutationFn: ({ data }) => editProductApi(data),
  });

  return { EditProduct, isEditting };
}
