import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getOneKeep } from "../../services/KeepApi";
export function useKeepOne() {
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { data, isLoading } = useQuery({
    queryKey: ["keep", page],
    queryFn: () => getOneKeep({ page, id }),
  });

  return { keepOne: data?.data, count: data?.count, isLoading };
}
