import { Spinner, Typography } from "@material-tailwind/react";
import Model from "../../UI/Model";
import Pagination from "../../UI/Pagination";
import Table from "../../UI/Table";
import ExpensesRow from "./ExpensesRow";
import ExpnenseForm from "./ExpnenseForm";
import { useSpends } from "./useGetExpends";
import { HiArrowLeft } from "react-icons/hi2";
import { Back } from "../../hooks/Back";
import Empty from "../../UI/Empty";

const header = ["نام", "دلیل", "مقدار", "تاریخ", ""].reverse();

function ExpenseTable() {
  const { spends, isLoading, count } = useSpends();
  const { goBack } = Back();

  if (isLoading)
    return (
      <Spinner
        className="h-16 w-16 fixed   top-[50%] left-[50%] "
        color="blue"
      />
    );
  if (!spends)
    return (
      <>
        <div className="float-left bottom-5">
          <HiArrowLeft
            size={30}
            onClick={() => goBack()}
            className="cursor-pointer  hover:text-blue-600"
          />
        </div>
        <div className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          <Empty data={"مصارف"} />
        </div>
      </>
    );
  return (
    <div className="w-full rounded-sm darkModeTop bg-gray-300 p-1">
      <Model>
        <Table>
          <Table.Header>
            {header?.map((el, index) => (
              <td className="py-3 darkModeMiddle" key={index}>
                <Typography
                  variant="small"
                  className={`font-semibold uppercase text-lg ${
                    index === 4 ? "pr-2" : ""
                  }`}
                >
                  {el}
                </Typography>
              </td>
            ))}
          </Table.Header>
          <Table.Body>
            {spends?.map((el, index) => (
              <ExpensesRow
                item={el}
                key={el.id}
                borderKey={index === spends.length - 1}
              />
            ))}
          </Table.Body>
          <Table.Footer>
            <Pagination count={count} pageSize={7} />
          </Table.Footer>
        </Table>

        <Model.Window name={"expendEdit"}>
          <ExpnenseForm />
        </Model.Window>
      </Model>
    </div>
  );
}
export default ExpenseTable;
