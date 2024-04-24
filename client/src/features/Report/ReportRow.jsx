import { Typography } from "@material-tailwind/react";
import Table from "../../UI/Table";
import { formatCurrency, formatQuantity } from "../../utils/helpers";
import { format } from "date-fns";

function PurchaseRow({ item, borderKey }) {
  const className =
    " darkModeMiddle dark:border-b border-blue-gray-50 dark:border-gray-900";
  const total = item.price * item.quantity;
  // price,quantity,location,pay,productName,productType,customerName,phone

  return (
    <>
      <Table.Row>
        <td className={`${className} capitalize hidden md:block`}>
          <Typography variant="small">
            {format(new Date(item.createdAt), "yyyy-MM-dd")}
          </Typography>
        </td>
        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small">{formatCurrency(total)} </Typography>
        </td>
        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small">
            {formatQuantity(item.quantity)}
          </Typography>
        </td>

        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small">{formatCurrency(item.price)}</Typography>
        </td>
        <td className={`${className} capitalize pr-2`}>
          <Typography variant="small" className="text-lg">
            {item?.product?.name}
          </Typography>
        </td>
      </Table.Row>
    </>
  );
}

export default PurchaseRow;
