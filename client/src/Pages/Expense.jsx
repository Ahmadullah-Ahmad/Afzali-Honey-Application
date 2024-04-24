import { Button, Card } from "@material-tailwind/react";
import ExpenseTable from "../features/Expenses/ExpenseTable";
import ExpnenseForm from "../features/Expenses/ExpnenseForm";
import Filter from "../UI/Filter";
import Model from "../UI/Model";
import SortBy from "../UI/SortBy";
import { useSpends } from "../features/Expenses/useGetExpends";
import Empty from "../UI/Empty";
import { Back } from "../hooks/Back";
import { HiArrowLeft } from "react-icons/hi2";

function Expense() {
  const { spends } = useSpends();
  const { goBack } = Back();

  if (spends?.length === 0)
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
          <Empty data={"خدمات"} />
          <div className="text-center">
            <Model>
              <Model.Open open={"ExpenseForm"}>
                <Button
                  variant="filled"
                  color="white"
                  className="bg-gray-400 darkModeSubimt buttonText ml-1 text-gray-900"
                >
                  ثبت کردن مصارف
                </Button>
              </Model.Open>
              <Model.Window name={"ExpenseForm"}>
                <ExpnenseForm />
              </Model.Window>
            </Model>
          </div>
        </div>
      </>
    );

  return (
    <Card className="h-full rounded-sm shadow-none darkModeTop bg-gray-300 p-1">
      <div className="flex items-center  darkModeTop bg-gray-300 p-1">
        <SortBy
          routes={[
            { value: "", label: "ترتیب" },
            { value: "amount-asc", label: "مقدار(صعودي‌)" },
            { value: "amount-desc", label: "مقدار(نزولی)" },
          ]}
        />
        <div className="pl-5">
          <Filter
            filterField={"get"}
            options={[
              { value: "all", label: "همه" },
              { value: 7, label: "هفت روز" },
              { value: 30, label: "سی روز" },
            ]}
          />
        </div>
      </div>

      <ExpenseTable />
      <div>
        <Model>
          <Model.Open open={"ExpenseForm"}>
            <Button
              variant="filled"
              color="white"
              className="bg-gray-400 darkModeSubimt buttonText ml-1 text-gray-900"
            >
              ثبت کردن مصارف
            </Button>
          </Model.Open>
          <Model.Window name={"ExpenseForm"}>
            <ExpnenseForm />
          </Model.Window>
        </Model>
      </div>
    </Card>
  );
}

export default Expense;
