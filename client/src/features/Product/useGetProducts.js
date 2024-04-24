import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../services/ProductApi";
export function useProducts() {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const type = searchParams.get("type");
  const sort = searchParams.get("sort");

  const { data, isLoading } = useQuery({
    queryKey: ["products", page, type, sort],
    queryFn: () => getAllProducts({ page, type, sort }),
  });
  return { products: data?.data, count: data?.count, isLoading };
}
