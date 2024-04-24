import { Typography } from "@material-tailwind/react";
import { formatCurrency } from "../../utils/helpers";

function BillRow({ item, index, borderKey, show }) {
  const total = item.price * item.quantity;
  const className = `py-1 text-lg dark:bg-transparent ${
    borderKey ? "" : "border-b border-blue-gray-50 dark:border-gray-900"
  }`;
  return (
    <tr
      role={"row"}
      className=" w-full items-center  px-1 text-right  odd:bg-gray-200/40 even:bg-gray-200 dark:odd:bg-[#374151] dark:even:bg-[#1f2937]"
      dir="rtl"
    >
      <td className={`${className}`}>
        <Typography>{formatCurrency(total)}</Typography>
      </td>
      <td className={`${className}`}>
        <Typography>{formatCurrency(item.price)}</Typography>
      </td>
      <td className={`${className}`}>
        <Typography>{item.quantity}</Typography>
      </td>
      <td className={`${className}`}>
        <Typography>{item.product}</Typography>
      </td>
      <td className={`${className} pr-2`}>
        <Typography>{index + 1}</Typography>
      </td>
    </tr>
  );
}

export default BillRow;
