import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { dashboardData } from "../../services/DashboardApi";
import { subDays } from "date-fns";
export function useDashboardData() {
  const [searchParams] = useSearchParams();
  const numberDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(Date.now()), numberDays);
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", `last-${numberDays}`],
    queryFn: () => dashboardData({ queryDate }),
  });

  return { data, isLoading, numberDays };
}
