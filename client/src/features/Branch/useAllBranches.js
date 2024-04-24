import { useQuery } from "@tanstack/react-query";
import { getAllBraches } from "../../services/branchApi";
export function useBranchAll() {
  const { data, isLoading } = useQuery({
    queryKey: ["branches"],
    queryFn: () => getAllBraches({ page: 0 }),
  });
  return { branches: data?.data, count: data?.count, isLoading };
}
