import { Button, Spinner, Typography } from "@material-tailwind/react";
import ReactPrint from "react-to-print";
import Table from "../../UI/Table";
import Empty from "../../UI/Empty";
import { useReport } from "./useGetReport";
import ReportRow from "./ReportRow";
import SpendRow from "./SpendRow";
import { useRef } from "react";
import { format } from "date-fns";
import { formatCurrency, formatQuantity } from "../../utils/helpers";
import { useUser } from "../Authentication/useUser";
const colums = ["نام", "قیمت", "مقدار", "مجموعه", "تاریخ"].reverse();
const header = ["نام", "دلیل", "مقدار", "تاریخ"].reverse();
function ReportTable() {
  const { Report, isLoading, type, start, end } = useReport();

  const { user, isLoading: LoadingUser } = useUser();

  let category = "فروشات";
  if (type === "spend") category = "مصارف";
  if (type === "sales") category = "فروشات";
  if (type === "purchase") category = "خریداری";

  const ref = useRef();
  const totalPrice = Report?.reduce(
    (pre, cur) => pre + cur.price * cur.quantity,
    0,
  );

  const totalQuantity = Report?.reduce((pre, cur) => pre + cur.quantity, 0);
  const price = Report?.reduce((pre, cur) => pre + cur.amount, 0);
  const ProfitData = Report?.reduce(
    (pre, cur) =>
      pre +
      (cur?.price - (cur?.price * cur?.discount) / 100).toFixed(0) *
        cur.quantity -
      cur.orignalPrice * cur.quantity,
    0,
  );

  const headerColumns = type !== "spend" ? colums : header;

  if (isLoading || LoadingUser)
    return (
      <Spinner
        className="fixed left-[50%] top-[50%]  h-16 w-16 "
        color="blue"
      />
    );
  if (Report?.length === 0) return <Empty data={"خلاصه " + category} />;
  return (
    <>
      <div className="darkModeTop rounded-sm  p-1">
        <div ref={ref} className="p-2">
          <div>
            <p className="text-center text-2xl font-bold uppercase">
              {user?.branch?.name}
            </p>
            <div className="flex justify-between px-3 font-body uppercase">
              <span>
                {format(new Date(start), "yyyy MMM dd")} - {""}
                {format(new Date(end), "yyyy MMM dd")}
              </span>
              <span className="text-lg font-semibold">
                {" "}
                خلاصه یی {type === "spend" && "مصارف"}
                {type === "sales" && "فروشات"}
                {type === "purchase" && "خریداری"}
              </span>
            </div>
          </div>

          <Table>
            <Table.Header>
              {headerColumns.map((el, index) => (
                <td className={`darkModeMiddle py-1 `} key={index}>
                  <Typography
                    variant="small"
                    className={`text-lg font-semibold uppercase ${
                      index === headerColumns.length - 1 ? "pr-2" : ""
                    }`}
                  >
                    {el}
                  </Typography>
                </td>
              ))}
            </Table.Header>
            <Table.Body>
              {type !== "spend"
                ? Report?.map((el) => <ReportRow item={el} key={el.id} />)
                : Report?.map((el) => <SpendRow item={el} key={el.id} />)}
              <tr>
                <td colSpan={5}>
                  <div>
                    {type !== "spend" ? (
                      <>
                        <div className="flex justify-between px-4 capitalize">
                          <Typography>
                            <span className="px-3 font-semibold">
                              {" "}
                              مجموعه مقدار :
                            </span>
                            {formatQuantity(totalQuantity)}{" "}
                          </Typography>

                          <Typography>
                            <span className="px-3 font-semibold">
                              {" "}
                              مجموعه {type === "sales" ? "فروش" : "خرید"} :
                            </span>
                            {formatCurrency(totalPrice)}{" "}
                          </Typography>
                        </div>
                      </>
                    ) : (
                      <Typography className="text-right text-lg ">
                        <span className="px-3 font-semibold">
                          {" "}
                          مجموعه مصارف :
                        </span>
                        {formatCurrency(price)}
                      </Typography>
                    )}
                  </div>
                </td>
              </tr>
            </Table.Body>
          </Table>
        </div>
        {type === "sales" && (
          <Typography className="px-6 text-right">
            <span className="px-3 font-semibold"> مجموعه فایده :</span>
            {formatCurrency(ProfitData)}{" "}
          </Typography>
        )}
        <ReactPrint
          trigger={() => (
            <Button className="darkModeSubimt buttonText float-right mr-2 mt-2 bg-gray-600">
              پرنت کردن
            </Button>
          )}
          content={() => ref.current}
        />
      </div>
    </>
  );
}

export default ReportTable;
