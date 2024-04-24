import { useMutation } from "@tanstack/react-query";
import { editExtractApi } from "../../services/extractApi";

export function useEditExtract() {
  const { mutate: EditExtract, isPending: isEditting } = useMutation({
    mutationFn: ({ data }) => editExtractApi({ data }),
  });

  return { EditExtract, isEditting };
}
