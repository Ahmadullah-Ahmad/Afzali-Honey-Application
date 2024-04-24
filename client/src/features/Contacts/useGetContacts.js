import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { contactBranch } from "../../services/branchApi";
export function useContacts() {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { data, isLoading } = useQuery({
    queryKey: ["contacts", page],
    queryFn: () => contactBranch({ page }),
  });
  return { contacts: data?.data?.doc, count: data?.count, isLoading };
}
