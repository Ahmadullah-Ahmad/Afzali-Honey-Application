import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getOneCustomer } from "../../services/customerApi";
export function useCustomerOne() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { data, isLoading } = useQuery({
    queryKey: ["customer", page],
    queryFn: () => getOneCustomer({ page, id }),
  });
  return {
    customer: data?.data,
    count: data?.count,
    sale: data?.sale,
    purchase: data?.purchase,
    customerStatistic: data?.customerDetails,
    isLoading,
  };
}
