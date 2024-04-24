import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllCustomer } from "../../services/customerApi";
export function useCustomers() {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const search = searchParams.get("search");
  const borrow =
    searchParams.get("loan") === "all" ? null : searchParams.get("loan");
  const { data, isLoading } = useQuery({
    queryKey: ["customers", page, search, borrow],
    queryFn: () => getAllCustomer({ page, search, borrow }),
  });

  return {
    Customers: data?.data,
    count: data?.count,
    isLoading,
  };
}
