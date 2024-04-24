import { useEffect } from "react";
import { useDarkMode } from "../Context/DarkModeContext";

export function useChartDarkMode() {
  const { isDark } = useDarkMode();

  useEffect(() => {
    const tooltipContainer = document.querySelector(".apexcharts-tooltip");
    const xaxisTooltip = document.querySelector(".apexcharts-xaxistooltip");
    const chartContainer = document.querySelector(".apexcharts-yaxis-label");
    if (chartContainer) {
      if (isDark) {
        tooltipContainer.classList.remove("apexcharts-theme-light");
        tooltipContainer.classList.add("apexcharts-theme-dark");
        xaxisTooltip.classList.remove("apexcharts-theme-light");
        xaxisTooltip.classList.add("apexcharts-theme-dark");
      }
    }
  }, [isDark]);
  const style = isDark
    ? {
        style: {
          colors: "#fff",
          fontSize: "10px",
          fontFamily: "inherit",
          fontWeight: 300,
        },
      }
    : {
        style: {
          colors: "#000",
          fontSize: "10px",
          fontFamily: "inherit",
          fontWeight: 300,
        },
      };

  const legendColor = { colors: isDark ? "#fff" : "#000" };
  const fillColor = isDark
    ? {
        colors: [
          "#4ecdc4",
          "#c7f464",
          "#81d4fa",
          "#fd6a6a",
          "#869ca7",
          "#22c55e",
        ],
      }
    : {
        colors: [
          "#008ffb",
          "#58ffc5",
          "#bb800d",
          "#ff4560",
          "#775dd0",
          "#22d3ee",
        ],
      };

  return { style, legendColor, fillColor };
}
