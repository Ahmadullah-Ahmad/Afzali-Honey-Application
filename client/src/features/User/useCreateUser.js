import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AddUser } from "../../services/userApi";

export function useAddUser() {
  const { mutate: addNewUser, isPending: isAdding } = useMutation({
    mutationFn: ({ user }) => AddUser({ user }),
    onError: (err) => toast.error(err.message),
  });

  return { addNewUser, isAdding };
}
