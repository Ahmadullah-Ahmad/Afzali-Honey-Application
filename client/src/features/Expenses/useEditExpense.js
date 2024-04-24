import { useMutation } from "@tanstack/react-query";
import { editExpenseApi } from "../../services/expendApi";

export function useEditExpends() {
  const { mutate: EditSpends, isPending: isEditting } = useMutation({
    mutationFn: ({ data }) => editExpenseApi({ data }),
  });

  return { EditSpends, isEditting };
}
