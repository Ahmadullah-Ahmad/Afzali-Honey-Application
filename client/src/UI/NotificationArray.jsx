import {
  Alert,
  Dialog,

  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { HiXMark } from "react-icons/hi2";
import { formatCurrency } from "../utils/helpers";
import { format } from "date-fns";

function Notification({
  price,
  open,
  deadline,
  close,
  createdDate,
  customer,
  product,
  notify,
}) {
  return (
    <Dialog open={open} handler={close} dir="rtl" className="darkModeMiddle">
      <DialogHeader className="flex items-center justify-between rounded-md ">
        <HiXMark
          className="cursor-pointer hover:text-blue-500 dark:text-white"
          size={30}
          onClick={close}
        />
        <Typography variant="h4" className="text-red-400">
          تاریخ پرداخت قرض
        </Typography>
      </DialogHeader>
      {notify?.map((el) => (
        <Alert
          className="darkModeButtom my-1 text-gray-700 dark:text-white"
          key={el.id}
          color="lime"
        >
          این محترم{" "}
          <span className="font-semibold text-gray-900 dark:text-green-500">
            {el.customer?.name}
          </span>{" "}
          به تاریخ{" "}
          <span className="text-sm font-thin text-gray-800 dark:text-green-500">
            {" "}
            {format(new Date(el.createdAt), "yyyy-dd-MMM")}
          </span>{" "}
          <span className="text-red-500 "> {el?.product?.name}</span> جنس پروخته
          شده است. که پرداخت باقیماده پول به تاریخ{" "}
          <span className="text-sm font-thin text-pink-600 dark:text-green-500">
            {format(new Date(el.deadline), "yyyy-dd-MMM")}
          </span>{" "}
          وعده شده است. که ازشما مخواهیم که مبلغ{" "}
          <span className="text-sm font-thin  text-red-500">
            {formatCurrency(el.price * el.quantity)}
          </span>{" "}
          را تحویل نماید.
        </Alert>
      ))}
    </Dialog>
  );
}

export default Notification;
