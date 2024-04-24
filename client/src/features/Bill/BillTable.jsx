import { Typography } from "@material-tailwind/react";
import BillRow from "./BillRow";
const header = ["شماره", "نام جنس", "مقدار", "قیمت", "مجموعه"].reverse();
function BillTable({ data }) {
  return (
    <table className="rounded-md shadow-sm">
      <thead>
        <tr className="darkModeMiddle rounded-md border-b border-blue-gray-50 bg-gray-300/70 p-2 text-right text-gray-600 dark:text-white">
          {header.map((el, index) => (
            <td className={`darkModeMiddle py-1 `} key={index}>
              <Typography
                variant="small"
                className={`text-lg font-semibold uppercase ${
                  index === header.length - 1 ? "pr-2" : ""
                }`}
              >
                {el}
              </Typography>
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <BillRow item={item} index={index} key={index} />
        ))}
      </tbody>
    </table>
  );
}

export default BillTable;
