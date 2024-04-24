import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AddKeeps } from "../../services/KeepApi";

export function useAddKeep() {
  const { mutate: addNewKeep, isPending: isAdding } = useMutation({
    mutationFn: ({ keeps }) => AddKeeps({ keeps }),
    onError: (err) => toast.error(err.message),
  });

  return { addNewKeep, isAdding };
}
