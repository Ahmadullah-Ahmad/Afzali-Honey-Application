import { Card } from "@material-tailwind/react";
import Customer from "../features/Customer/CustomerTable";
import { useCustomers } from "../features/Customer/useGetCustomer";
import Empty from "../UI/Empty";
import Filter from "../UI/Filter";
import CustomerSearch from "../features/Customer/CustomerSearch";
import { HiArrowLeft } from "react-icons/hi2";
import { Back } from "../hooks/Back";

function KeepHoney() {
  const { Customers } = useCustomers();

  const { goBack } = Back();

  if (Customers?.length === 0)
    return (
      <>
        <div className="float-left bottom-5">
          <HiArrowLeft
            size={30}
            onClick={() => goBack()}
            className="cursor-pointer  hover:text-blue-600"
          />
        </div>
        <div className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          <Empty data={"مشتری"} />
        </div>
      </>
    );
  return (
    <Card className="grid h-full grid-rows-[auto_1fr] bg-gray-300 darkModeTop rounded-sm shadow-none">
      <div className="flex justify-between px-1 items-center">
        <CustomerSearch />
        <Filter
          filterField={"loan"}
          options={[
            { value: "all", label: "همه" },
            { value: "loan", label: "قرضدارها" },
            { value: "lender", label: "قرض‌ دهنده‌ " },
          ]}
        />
      </div>
      <div>
        <Customer />
      </div>
    </Card>
  );
}

export default KeepHoney;
