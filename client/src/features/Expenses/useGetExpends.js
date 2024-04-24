import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllSpends } from "../../services/expendApi";
export function useSpends() {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const get = searchParams.get("get");
  const sort = searchParams.get("sort");
  const { data, isLoading } = useQuery({
    queryKey: ["spends", page, get, sort],
    queryFn: () => getAllSpends({ page, get, sort }),
  });
  return { spends: data?.data, count: data?.count, isLoading };
}
