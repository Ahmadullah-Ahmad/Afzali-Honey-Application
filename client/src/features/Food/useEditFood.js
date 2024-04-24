import { useMutation } from "@tanstack/react-query";
import { editFoodApi } from "../../services/foodApi";

export function useEditFood() {
  const { mutate: EditFood, isPending: isEditting } = useMutation({
    mutationFn: ({ data }) => editFoodApi({ data }),
  });

  return { EditFood, isEditting };
}
