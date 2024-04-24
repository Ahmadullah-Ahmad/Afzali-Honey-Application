import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export function useLogOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  function logOut() {
    queryClient.invalidateQueries({ active: true });
    localStorage.removeItem("jwt");
    navigate("/login");
  }
  return { logOut };
}
