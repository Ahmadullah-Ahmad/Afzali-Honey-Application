import { useQuery } from "@tanstack/react-query";
import { getAdvetismentOne } from "../../services/ProductApi";
import { useParams } from "react-router-dom";
export function useProductOne() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["productOne", id],
    queryFn: () => getAdvetismentOne(id),
  });
  return { product: data?.data, isLoading };
}
