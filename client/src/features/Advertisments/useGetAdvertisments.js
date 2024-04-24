import { useQuery } from "@tanstack/react-query";
import { getAdvetisments } from "../../services/ProductApi";
import { useSearchParams } from "react-router-dom";
export function useAllProducts() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data, isLoading } = useQuery({
    queryKey: ["Allproducts", page],
    queryFn: () => getAdvetisments(page),
    throwOnError: true,
  });
  return { products: data?.data, count: data?.count, isLoading };
}
