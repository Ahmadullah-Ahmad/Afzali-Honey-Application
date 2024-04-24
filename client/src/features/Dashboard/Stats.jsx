import {
  HiOutlineBanknotes,
  HiOutlineChartBar,
  HiOutlineCircleStack,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
import { StatisticsCard } from "./StatisticsCard";
import { formatCurrency, formatQuantity } from "../../utils/helpers";
function Stats({ sale, totalHoney, boxes, totalPurchase }) {
  return (
    <div className="flex flex-col items-center gap-4 p-2 dark:bg-transparent dark:text-white sm:w-full sm:justify-center md:flex-row">
      <StatisticsCard
        color={"text-green-700 bg-green-200"}
        icon={<HiOutlineSquare3Stack3D size={25} />}
        title="صندوق"
        value={boxes}
      />
      <StatisticsCard
        color={"text-blue-700 bg-blue-200"}
        icon={<HiOutlineCircleStack size={25} />}
        title="عسل"
        value={formatQuantity(totalHoney?.toFixed(2))}
      />
      <StatisticsCard
        color={"text-orange-700 bg-orange-200"}
        icon={<HiOutlineBanknotes size={25} />}
        title="فروشات"
        value={formatCurrency(sale?.toFixed(0))}
      />
      <StatisticsCard
        color={"text-indigo-700  bg-indigo-200"}
        icon={<HiOutlineChartBar size={25} />}
        title="خریداری"
        value={formatCurrency(totalPurchase?.toFixed(0))}
      />
    </div>
  );
}

export default Stats;
