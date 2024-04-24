import { Card, Spinner } from "@material-tailwind/react";
import Stats from "./Stats";

import LineChart from "./LineCharts";
import PieChart from "./PieChart.jsx";
import { useDashboardData } from "./useGetDashboard.js";
import Empty from "../../UI/Empty.jsx";
function DashboardLayout() {
  const { data, isLoading = true, numberDays } = useDashboardData();

  // PiChart label
  let chartLabel = [];
  data?.product?.filter((el) => {
    if (!chartLabel.includes(el.type.toUpperCase())) {
      return chartLabel.push(el.type.toUpperCase());
    }
    return el;
  });

  // Pi chart Data
  const PieChartData = chartLabel.map((el) =>
    data?.product
      ?.filter((product) => product.type.toUpperCase() === el)
      ?.reduce((pre, cur) => pre + cur.quantity, 0),
  );
  console.log(data?.product);
  //total sales
  const totalSale = data?.sales?.reduce(
    (pre, cur) =>
      pre + (cur?.price - (cur?.price * cur?.discount) / 100) * cur.quantity,
    0,
  );

  // total honey
  const totalHoney = data?.product
    ?.filter((el) => el?.type === "شهت" || el?.type === "عسل")
    ?.reduce((pre, cur) => pre + cur?.quantity, 0);
  const totalBoxes = data?.product
    ?.filter((el) => el?.type === "مچی")
    ?.reduce((pre, cur) => pre + cur?.quantity, 0);

  // total boxes
  const boxes = data?.boxes?.reduce((pre, cur) => pre + cur?.boxes, 0);

  // total purchase
  const totalPurchase = data?.purchase?.reduce(
    (pre, cur) => pre + cur?.price * cur?.quantity,
    0,
  );

  if (isLoading)
    return (
      <Spinner
        className="absolute left-[50%] top-[50%] h-16 w-16 backdrop-blur-sm "
        color="blue"
      />
    );
  if (!data) return <Empty data={"معلومات"} />;

  return (
    <Card className="darkModeTop grid-rows-[auto_1fr] gap-y-12 rounded-none bg-inherit  py-4">
      <Stats
        sale={totalSale}
        totalHoney={totalHoney}
        boxes={totalBoxes}
        totalPurchase={totalPurchase}
      />
      <div className=" grid grid-rows-[auto_auto] gap-3 px-2 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <LineChart
            numberDays={numberDays}
            sale={data?.sales}
            purchase={data?.purchase}
          />
        </div>
        <PieChart chartLabel={chartLabel} PieChartData={PieChartData} />
      </div>
    </Card>
  );
}

export default DashboardLayout;
