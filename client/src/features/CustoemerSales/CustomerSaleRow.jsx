import { Typography } from "@material-tailwind/react";
import Table from "../../UI/Table";
import { formatCurrency, formatQuantity } from "../../utils/helpers";
import { format } from "date-fns";

function CustomerSaleRow({ item, borderKey }) {
  const className = "border-b darkModeMiddle border-blue-gray-50 py-2";

  return (
    <>
      <Table.Row>
        <td className={`${className} capitalize`}>
          <Typography variant="small">
            {format(new Date(item?.createdAt), "yyyy-MM-dd")}
          </Typography>
        </td>
        <td className={`${className} relative capitalize`}>
          <div dir="rtl">
            {formatCurrency(item?.price * item?.quantity)}{" "}
            {item?.pay ? (
              ""
            ) : (
              <span
                className={`absolute bottom-0 right-2 text-[10px]  ${
                  item?.pay ? "" : "text-red-300"
                }`}
              >
                {item.pay ? "" : "(قرض)"}
              </span>
            )}
          </div>
        </td>
        <td className={`${className} capitalize`}>
          <Typography variant="small" dir="rtl">
            {formatQuantity(item?.quantity)}
          </Typography>
        </td>
        <td className={`${className} pr-2 capitalize`}>
          <Typography variant="small">{item?.product?.name}</Typography>
        </td>
      </Table.Row>
    </>
  );
}

export default CustomerSaleRow;
