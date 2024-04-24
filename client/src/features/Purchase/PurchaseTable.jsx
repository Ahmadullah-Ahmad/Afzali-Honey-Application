import {  Spinner, Typography } from "@material-tailwind/react";
import Table from "../../UI/Table";
import PurchaseRow from "./PurchaseRow";
import PurchaseForm from "./PurchaseForm";
import { usePurchase } from "./useGetPurchase";
import { useSearchParams } from "react-router-dom";
import Model from "../../UI/Model";
import Pagination from "../../UI/Pagination";
import { differenceInHours,  parseISO } from "date-fns";
import Notification from "../../UI/NotificationArray";
import { useState } from "react";
import { HiMiniChatBubbleLeftEllipsis } from "react-icons/hi2";
const PurchaseHeader = [
  "فروشنده‌",
  "نام",
  "ادرس",
  "مقدار",
  "تاریخ",
  "قیمت",
  "پرداخت",
  "مجموعه",
  "",
].reverse();

function PurchaseTable() {
  const { count, isLoading, purchases } = usePurchase();
  const [searchParams, setSearchParams] = useSearchParams();

  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const notify = purchases?.filter((el) => {
    const date = new Date();
    const hourDiference = differenceInHours(
      parseISO(el.deadline),
      parseISO(new Date(date.getTime()).toISOString()),
    );
    if (hourDiference <= 24 && hourDiference > 0 && !el?.pay) return el;
    return null;
  });

  if (purchases?.length === 0) {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }
  if (isLoading)
    return (
      <Spinner
        className="fixed left-[50%] top-[50%]  h-16 w-16 "
        color="blue"
      />
    );
  return (
    <div className="darkModeTop relative rounded-sm bg-gray-300 p-1">
      {notify?.length !== 0 && (
        <HiMiniChatBubbleLeftEllipsis
          size={30}
          onClick={() => setOpen(true)}
          className="absolute left-5 top-3 z-50 cursor-pointer text-green-700"
        />
      )}
      <div>
        <Model>
          <Table>
            <Table.Header>
              {PurchaseHeader.map((el, index) => (
                <td
                  key={el}
                  className={`darkModeMiddle py-3  ${
                    index === 1 || index === 3 || index === 6
                      ? "hidden md:block"
                      : ""
                  }`}
                >
                  <Typography
                    variant="small"
                    className={` text-lg font-semibold uppercase ${
                      index === 8 ? "pr-2" : ""
                    }`}
                  >
                    {el}
                  </Typography>
                </td>
              ))}
            </Table.Header>
            <Table.Body>
              {purchases?.map((el, index) => (
                <PurchaseRow
                  item={el}
                  key={el.id}
                  borderKey={index === purchases.length - 1}
                  hiddenFile={
                    index === 0 || index === 2 || index === 5 ? true : false
                  }
                />
              ))}
            </Table.Body>
            <Table.Footer>
              <Pagination count={count} pageSize={6} />
            </Table.Footer>
          </Table>

          <Model.Window name={"purchaseEdit"}>
            <PurchaseForm />
          </Model.Window>

          <Notification open={open} close={close} notify={notify} />
        </Model>
      </div>
    </div>
  );
}

export default PurchaseTable;
