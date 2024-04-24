// Saving for chart information the is not used in the project

const chartsConfig = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#000",
        fontSize: "10px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#000",
        fontSize: "10px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
    },
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
    theme: "dark",
  },
};
const websiteViewsChart = {
  type: "area",
  height: 220,
  series: [
    {
      name: "Views",
      data: [50, 20, 10, 22, 50, 10, 40],
    },
    {
      name: "Purchases",
      data: [10, 20, 50, 25, 50, 30, 40],
    },
  ],
  colors: ["#d9701b2b", "#ff00ff"],

  options: {
    ...chartsConfig,
    color: "#2bf12b",
    plotOptions: {
      bar: {
        columnWidth: "5%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};
export default websiteViewsChart;
