import { Card, Typography } from "@material-tailwind/react";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import Chart from "react-apexcharts";

import { useChartDarkMode } from "../../hooks/chartDarkMode";
const chartsConfig = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: true,
    borderColor: "#ffffff40",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 15,
      right: 20,
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: "light",
    style: { fontSize: "12px" },
  },
};

function LineChart({ sale, purchase, numberDays }) {
  const { legendColor, style } = useChartDarkMode();
  //specifying days
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numberDays),
    end: new Date(),
  });
  //Line Chart label
  const label = allDates.map((date) => {
    return format(date, "MMM dd");
  });

  //All sales for line Chart
  const saleData = allDates.map((date) => {
    const value = sale
      ?.filter((sale) => isSameDay(date, new Date(sale.createdAt)))
      ?.reduce(
        (pre, cur) =>
          pre +
          (cur?.price - (cur?.price * cur?.discount) / 100) * cur.quantity,
        0,
      );
    return value.toFixed(0);
  });
  //All sales for line Chart
  const purchaseData = allDates.map((date) => {
    const value = purchase
      ?.filter((purchase) => isSameDay(date, new Date(purchase.createdAt)))
      ?.reduce((pre, cur) => pre + cur?.price * cur.quantity, 0);

    return value.toFixed(0);
  });
  // All Profit for line Chart
  const ProfitData = allDates.map((date) => {
    const value = sale
      ?.filter((sales) => isSameDay(date, new Date(sales.createdAt)))
      ?.reduce(
        (pre, cur) =>
          pre +
          (cur?.price - (cur?.price * cur?.discount) / 100).toFixed(0) *
            cur.quantity -
          cur.orignalPrice * cur.quantity,
        0,
      );
    return value.toFixed(0);
  });

  const websiteViewsChart = {
    type: "area",
    height: 220,
    series: [
      {
        name: "فروشات",
        data: saleData,
      },
      {
        name: "خریداری",
        data: purchaseData,
      },
      {
        name: "فایده",
        data: ProfitData,
      },
    ],
    colors: ["#4d41372b", "#713c71"],
    options: {
      ...chartsConfig,
      color: "#f1c92b",
      plotOptions: {
        bar: {
          columnWidth: "5%",
          borderRadius: 5,
        },
      },
      xaxis: {
        categories: label,
        labels: { ...style },
      },
      yaxis: {
        labels: { ...style },
      },
      legend: { labels: { ...legendColor } },
    },
  };
  return (
    <Card className="darkModeMiddle bg-gray-100 dark:text-white">
      <Typography className="py-2 text-center text-lg font-semibold uppercase">
        <span className="font-normal">
          {format(allDates.at(0), "MMM dd yyyy")}
        </span>{" "}
        تا{" "}
        <span className="font-medium">
          {format(allDates.at(-1), "MMM dd yyyy")}{" "}
        </span>
        فروشات از
      </Typography>
      <Chart {...websiteViewsChart} />
    </Card>
  );
}

export default LineChart;
