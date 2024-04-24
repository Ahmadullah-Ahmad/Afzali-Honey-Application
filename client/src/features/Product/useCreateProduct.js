import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AddProduct } from "../../services/ProductApi";

export function useAddProduct() {
  const { mutate: addNewProduct, isPending: isAdding } = useMutation({
    mutationFn: ({ product }) => AddProduct({ product }),
    onError: (err) => toast.error(err.message),
  });

  return { addNewProduct, isAdding };
}
