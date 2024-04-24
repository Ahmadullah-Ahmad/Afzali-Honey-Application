import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { login } from "../../services/AuthApi";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: Login, isPending: isLogin } = useMutation({
    mutationFn: ({ username, password }) => login({ username, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard/home", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { Login, isLogin };
}
