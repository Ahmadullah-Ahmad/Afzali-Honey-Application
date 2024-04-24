import { useMutation } from "@tanstack/react-query";
import { editKeepApi } from "../../services/KeepApi";

export function useEditKeep() {
  const { mutate: EditKeep, isPending: isEditting } = useMutation({
    mutationFn: ({ data }) => editKeepApi({ data }),
  });

  return { EditKeep, isEditting };
}
