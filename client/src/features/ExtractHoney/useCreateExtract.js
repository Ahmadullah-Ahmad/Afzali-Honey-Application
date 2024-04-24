import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AddExtract } from "../../services/extractApi";

export function useAddExtract() {
  const { mutate: addExtractHoney, isPending: isAdding } = useMutation({
    mutationFn: ({ honey }) => AddExtract({ honey }),
    onError: (err) => toast.error(err.message),
  });

  return { addExtractHoney, isAdding };
}
