import { Card, Spinner, Typography } from "@material-tailwind/react";
import { useSideBar } from "../../Context/SideBar";
import { useContacts } from "../Contacts/useGetContacts";
import { useUser } from "../Authentication/useUser";
import { format } from "date-fns";

import { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { HiOutlinePrinter } from "react-icons/hi2";
import BillHeader from "./BillHeader";
import BillFooter from "./BillFooter";
import BillTable from "./BillTable";

function BillPrint() {
  const { billState } = useSideBar();
  const { contacts, isLoading: isLoadingContact } = useContacts();
  const { user, isLoading } = useUser();
  const [showX, setShowX] = useState(true);
  const customerName = billState.bill[0]?.customerName;
  const branch = contacts?.find((el) => el.id === user?.branchId);

  const total = billState.bill.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0,
  );

  const ref = useRef();

  if (isLoading || isLoadingContact)
    return (
      <Spinner
        className="fixed left-[50%] top-[50%]  h-16 w-16 translate-x-[-50%] translate-y-[-50%] "
        color="blue"
      />
    );
  if (billState.bill?.length === 0)
    return (
      <Card className="py-3 dark:bg-transparent dark:text-white">
        <Typography className="text-xl">
          {" "}
          معلومات درباره یی <span className="text-blue-500">بیل</span> یافته نشد
        </Typography>
      </Card>
    );
  return (
    <Card className="relative flex w-[100dvh] flex-col items-center rounded-md p-3 shadow-none dark:bg-transparent">
      <div
        ref={ref}
        className="darkModeButtom flex h-full flex-col gap-y-4 rounded-md bg-gray-100/50 p-3"
      >
        <Typography variant="h3" className="text-center ">
          {branch?.name}
        </Typography>
        <BillHeader location={branch?.location} phone={branch?.phone} />
        <div className="darkModeTop flex items-center justify-between   rounded-md px-8">
          <Typography>
            {format(new Date(), "yyyy / MM / dd")}
            <span className="px-2 text-lg ">: تاریخ</span>
          </Typography>
          <Typography className="text-2xl" dir="rtl">
            {" "}
            <span className="pl-2">نام مشتری:</span>
            {customerName}
          </Typography>
        </div>
        <BillTable data={billState.bill} />
        <BillFooter total={total} />
      </div>
      <div className="absolute left-6 top-5">
        <ReactToPrint
          trigger={() => (
            <HiOutlinePrinter
              size={30}
              className="cursor-pointer text-blue-500"
              title="پرنت کردن"
            />
          )}
          onBeforePrint={() => setShowX(() => false)}
          onBeforeGetContent={() => setShowX(() => false)}
          content={() => ref.current}
        />
      </div>
    </Card>
  );
}

export default BillPrint;
