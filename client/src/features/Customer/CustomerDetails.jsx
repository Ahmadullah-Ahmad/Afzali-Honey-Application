import { Card, Spinner, Typography } from "@material-tailwind/react";
import { DetailsCard } from "./DetailsCard";
import { Back } from "../../hooks/Back";
import { useCustomerOne } from "./useGetOneCustomer";
import CustoemerSalesTable from "../CustoemerSales/CustoemerSalesTable";
import CustomerPurchaseTable from "../CustoemerPurchase/CustoemerPuchaseTable";
import { formatCurrency } from "../../utils/helpers";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import Pagination from "../../UI/Pagination";

function CustomerDatails() {
  const { customer, purchase, sale, isLoading, customerStatistic } =
    useCustomerOne();
  const count = sale > purchase ? sale : purchase;

  const { goBack } = Back();
  const totalPurchase = customerStatistic?.purchase?.reduce(
    (pre, cur) => cur.price * cur.quantity + pre,
    0
  );
  const totalLoanOnMe = customerStatistic?.purchase
    ?.filter((el) => el?.pay === false)
    .reduce((pre, cur) => cur.quantity * cur.price + pre, 0);

  const totalSales = customerStatistic?.Sales?.reduce(
    (pre, cur) => cur.price * cur.quantity + pre,
    0
  );
  const totalLoanOnCustomer = customerStatistic?.Sales?.filter(
    (el) => el?.pay === false
  ).reduce((pre, cur) => cur.quantity * cur.price + pre, 0);
  if (isLoading)
    return (
      <div className="flex items-center h-[100dvh] w-full justify-center">
        <Spinner className="h-16 w-16 " color="blue" />
      </div>
    );

  return (
    <Card className=" rounded-sm h-full darkModeTop bg-gray-200 p-2 shadow-none ">
      <HiOutlineArrowLeft
        size={25}
        onClick={() => goBack()}
        className="cursor-pointer hover:text-blue-300"
      />
      <div>
        <div className="flex justify-center md:flex-row flex-col">
          <DetailsCard title={"نام"} value={customer?.name} />
          <DetailsCard title={"شمار تلیفون"} value={customer?.phone} />
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 sm:flex sm:flex-col gap-2 pt-2 flex-col">
        <div>
          <CustoemerSalesTable product={customer?.Sales} count={sale} />
          {customer?.Sales?.length !== 0 ? (
            <div className="flex justify-between items-center p-1">
              <Typography variant="small">
                مجموعه فروش:
                <span className="px-2">{formatCurrency(totalSales)}</span>
              </Typography>
              <Typography variant="small">
                مجموعه قرض:
                <span className="px-2">
                  {formatCurrency(totalLoanOnCustomer)}
                </span>
              </Typography>
            </div>
          ) : null}
        </div>
        <div>
          <CustomerPurchaseTable
            product={customer?.purchase}
            count={purchase}
            customer={customer?.name}
          />
          {customer?.purchase?.length !== 0 ? (
            <div className="flex justify-between items-center p-1">
              <Typography variant="small">
                مجموعه خریداری:
                <span className="px-2">{formatCurrency(totalPurchase)}</span>
              </Typography>
              <Typography variant="small">
                مجموعه قرض:
                <span className="px-2">{formatCurrency(totalLoanOnMe)}</span>
              </Typography>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Pagination count={count} pageSize={5} />
      </div>
    </Card>
  );
}

export default CustomerDatails;
