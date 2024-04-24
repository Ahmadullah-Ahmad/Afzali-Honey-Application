import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/AuthApi";
export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      if (getCurrentUser() === null) return {};
      else return getCurrentUser();
    },
  });

  return { user, isLoading };
}
