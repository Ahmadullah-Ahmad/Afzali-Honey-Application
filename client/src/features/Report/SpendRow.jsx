import { Typography } from "@material-tailwind/react";
import { format } from "date-fns";

import Table from "../../UI/Table";

function ExpensesRow({ item, borderKey }) {
  const className = ` darkModeMiddle ${
    borderKey ? "" : "border-b border-blue-gray-50 dark:border-gray-900"
  }`;

  return (
    <>
      <Table.Row>
        <td className={`${className} capitalize `}>
          <Typography variant="small">
            {format(new Date(item.createdAt), "yyyy-MM-dd")}
          </Typography>
        </td>

        <td className={`${className} capitalize `}>
          <Typography variant="small">{item.amount}</Typography>
        </td>
        <td className={`${className} capitalize `}>
          <Typography variant="small" className="text-lg">
            {item.reason}
          </Typography>
        </td>
        <td className={`${className} capitalize  pr-2`}>
          <Typography variant="small" className="text-lg">
            {item.taker}
          </Typography>
        </td>
      </Table.Row>
    </>
  );
}

export default ExpensesRow;
