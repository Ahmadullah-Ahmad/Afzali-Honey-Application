import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ReportData } from "../../services/reportApi";
import { getToday } from "../../utils/helpers";
import { format, subDays } from "date-fns";
export function useReport() {
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  let type = "sales";

  let start = subDays(new Date(format(new Date(), "yyyy MM ddd")), 7);

  let end = getToday();
  if (date) {
    const search = JSON.parse(date);
    type = search.type;
    start = search.from;
    end = search.to;
  }
  const { data, isLoading } = useQuery({
    queryKey: ["report", type, start, end],
    queryFn: () => ReportData({ type, start, end }),
  });

  return {
    Report: data?.report,
    type: data?.type,
    isLoading,
    count: data?.count,
    start,
    end,
  };
}
