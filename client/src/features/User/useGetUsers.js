import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllUseres } from "../../services/userApi";
export function useBranchs() {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { data, isLoading } = useQuery({
    queryKey: ["allUsers", page],
    queryFn: () => getAllUseres({ page }),
  });
  return { branches: data?.data, count: data?.count, isLoading };
}
