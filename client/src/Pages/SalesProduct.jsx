import { Card, Button, Spinner } from "@material-tailwind/react";
import SalesTable from "../features/Sales/SalesTable";
import SortBy from "../UI/SortBy";
import Model from "../UI/Model";
import Empty from "../UI/Empty";
import NavBarMenu from "../UI/NavBarMenu";

import SalesForm from "../features/Sales/SalesForm";
import { useSales } from "../features/Sales/useGetSales";
import { HiArrowLeft } from "react-icons/hi2";
import { Back } from "../hooks/Back";
import { useDashboardData } from "../features/Dashboard/useGetDashboard";
import BillPrint from "../features/Bill/BillPrint";

function Sales() {
  const { sells, isLoading } = useSales();
  const { data, isLoading: productLoading } = useDashboardData();

  // Menu label
  let chartLabel = ["همه"];
  data?.product?.filter((el) => {
    if (!chartLabel.includes(el.type.toUpperCase())) {
      return chartLabel.push(el.type.toUpperCase());
    }
    return el;
  });
  const { goBack } = Back();
  if (isLoading || productLoading)
    return (
      <Spinner
        className="fixed left-[50%] top-[50%]  h-16 w-16 "
        color="blue"
      />
    );
  if (sells?.length === 0)
    return (
      <>
        <div className="bottom-5 float-left">
          <HiArrowLeft
            size={30}
            onClick={() => goBack()}
            className="cursor-pointer  hover:text-blue-600"
          />
        </div>
        <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] transform">
          <Empty data={" فروشات"} />
          <div className="mt-4 flex justify-center px-2">
            <Model>
              <Model.Open open={"purchaseForm"}>
                <Button
                  variant="filled"
                  color="white"
                  className="bg-gray-400 text-gray-900"
                >
                  فروش جدید
                </Button>
              </Model.Open>

              <Model.Window name={"purchaseForm"}>
                <SalesForm />
              </Model.Window>
            </Model>
          </div>
        </div>
      </>
    );
  return (
    <Card className="darkModeTop  grid grid-rows-[auto_1fr] rounded-sm bg-gray-300 p-1 shadow-none">
      <div className="darkModeTop flex flex-row  items-center rounded-none  p-1  ">
        <div className="flex w-72 justify-center gap-x-3">
          <SortBy
            routes={[
              { value: "", label: "ترتیب" },
              { value: "quantity-asc", label: "مقدار(صعودي‌)" },
              { value: "quantity-desc", label: "مقدار(نزولی)" },
              { value: "price-asc", label: "قیمت(صعودي‌)" },
              { value: "price-desc", label: "قیمت(نزولی)" },
            ]}
          />
          <NavBarMenu routes={chartLabel} />
        </div>
      </div>
      <SalesTable />
      <Model>
        <div className="flex justify-between px-3">
          <Model.Open open={"purchaseForm"}>
            <Button
              variant="filled"
              color="white"
              className="darkModeSubimt buttonText bg-gray-400 text-gray-900"
            >
              فروش جدید
            </Button>
          </Model.Open>

          <Model.Window name={"purchaseForm"}>
            <SalesForm routes={chartLabel} />
          </Model.Window>

          <Model.Open open={"Bill"}>
            <Button
              variant="filled"
              color="white"
              className="darkModeSubimt buttonText bg-gray-400 text-gray-900"
            >
              بیل{" "}
            </Button>
          </Model.Open>

          <Model.Window name={"Bill"}>
            <BillPrint />
          </Model.Window>
        </div>
      </Model>
    </Card>
  );
}

export default Sales;
