import { useMutation } from "@tanstack/react-query";
import { editUserApi } from "../../services/userApi";

export function useEditUser() {
  const { mutate: EditUser, isPending: isEditting } = useMutation({
    mutationFn: ({ data }) => editUserApi({ data }),
  });

  return { EditUser, isEditting };
}
