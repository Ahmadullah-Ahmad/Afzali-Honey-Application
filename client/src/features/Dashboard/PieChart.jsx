import { Card, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { useChartDarkMode } from "../../hooks/chartDarkMode";

function PieChart({ chartLabel, PieChartData }) {
  const { legendColor, fillColor } = useChartDarkMode();
  const option = {
    
    colors: fillColor.colors,
    legend: {
      horizontalAlign: "center",
      position: "right",
      containerMargin: { top: "20px" },
      width: "50%",
      floating: true,
      fontSize: "16px",
      labels: { ...legendColor },
    },
    grid: {
      padding: { right: true, left: true, top: true, bottom: true },
    },
    labels: chartLabel,
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    dataLabels: { enabled: true, style: { fontSize: "8px", padding: "4px" } },

    stroke: {
      width: 2,
      show: true,
      colors: ["transparent"],
    },
    fill: { ...fillColor },
  };

  return (
    <Card className="darkModeMiddle bg-gray-100 dark:text-white">
      <Typography className="py-3 text-center text-lg font-semibold uppercase">
        مجموع تولیدات
      </Typography>
      <Chart type="donut" series={PieChartData} height={200} options={option} />
    </Card>
  );
}

export default PieChart;
