import { useMutation } from "@tanstack/react-query";
import { editBranchApi } from "../../services/branchApi";

export function useEditBranch() {
  const { mutate: EditBranch, isPending: isEditting } = useMutation({
    mutationFn: ({ data }) => editBranchApi({ data }),
  });

  return { EditBranch, isEditting };
}
