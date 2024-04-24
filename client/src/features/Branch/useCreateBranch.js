import { useMutation } from "@tanstack/react-query";
import { AddBranch } from "../../services/branchApi";

export function useAddBranch() {
  const { mutate: addNewBranch, isPending: isAdding } = useMutation({
    mutationFn: ({ branch }) => AddBranch({ branch }),
  });

  return { addNewBranch, isAdding };
}
