import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllSales } from "../../services/SalesApi";
export function useSales() {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const type = searchParams.get("type");
  const sort = searchParams.get("sort");
  const { data, isLoading } = useQuery({
    queryKey: ["sells", page, type, sort],
    queryFn: () => getAllSales({ page, type, sort }),
  });
  return { sells: data?.data, count: data?.count, isLoading };
}
