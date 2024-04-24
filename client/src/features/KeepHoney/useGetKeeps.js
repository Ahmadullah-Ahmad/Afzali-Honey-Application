import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllKeep } from "../../services/KeepApi";
export function useKeeps() {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const search = !searchParams.get("search")
    ? null
    : searchParams.get("search");
  const { data, isLoading } = useQuery({
    queryKey: ["keeps", page, search],
    queryFn: () => getAllKeep({ page, search }),
  });
  return { keeps: data?.data, count: data?.count, isLoading };
}
