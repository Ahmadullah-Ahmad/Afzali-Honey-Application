import {
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { HiXMark } from "react-icons/hi2";

function Notification({
  price,
  open,
  deadline,
  close,
  createdDate,
  customer,
  product,
}) {
  return (
    <Dialog open={open} handler={close} dir="rtl" className="darkModeMiddle ">
      <DialogHeader className="darkModeMiddle flex items-center justify-between rounded-md">
        <HiXMark
          className="cursor-pointer hover:text-blue-500 "
          size={30}
          onClick={close}
        />
        <Typography variant="h4" className="text-red-400">
          تاریخ پرداخت قرض
        </Typography>
      </DialogHeader>
      <DialogBody className="text-gray-700 dark:text-white">
        این محترم{" "}
        <span className="font-semibold text-gray-900 dark:text-indigo-300">
          {customer}
        </span>{" "}
        به تاریخ{" "}
        <span className="text-sm font-thin text-gray-800 dark:text-indigo-300">
          {" "}
          {createdDate}
        </span>{" "}
        <span className="text-green-500 "> {product}</span> جنس پروخته شده است.
        که پرداخت باقیماده پول به تاریخ{" "}
        <span className="text-sm font-thin text-gray-800 dark:text-indigo-300">
          {deadline}
        </span>{" "}
        وعده شده است. که ازشما مخواهیم که مبلغ{" "}
        <span className="text-sm font-thin  text-green-500">{price}</span> را
        تحویل نماید.
      </DialogBody>
    </Dialog>
  );
}

export default Notification;

