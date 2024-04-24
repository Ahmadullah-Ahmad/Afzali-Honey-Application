import { useMutation } from "@tanstack/react-query";
import { editCustomerApi } from "../../services/customerApi";

export function useEditCustomer() {
  const { mutate: EditCustomer, isPending: isEditting } = useMutation({
    mutationFn: ({ data }) => editCustomerApi({ data }),
  });

  return { EditCustomer, isEditting };
}
