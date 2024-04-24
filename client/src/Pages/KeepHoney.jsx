import { Button, Card, Input, Spinner } from "@material-tailwind/react";
import KeepForm from "../features/KeepHoney/KeepForm";
import KeepTable from "../features/KeepHoney/KeepTable";
import { useKeeps } from "../features/KeepHoney/useGetKeeps";
import Empty from "../UI/Empty";
import Model from "../UI/Model";

import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Back } from "../hooks/Back";
import { HiArrowLeft } from "react-icons/hi2";

function KeepHoney() {
  const { keeps, isLoading } = useKeeps();
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, reset, handleSubmit } = useForm();
  const { goBack } = Back();
  function handlSearch(data) {
    searchParams.set("search", data.date);
    setSearchParams(searchParams);
    reset();
  }
  if (isLoading)
    return (
      <Spinner
        className="h-16 w-16 fixed  top-[50%] left-[50%] "
        color="blue"
      />
    );
  if (keeps?.length === 0)
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
          <div className="px-2 flex justify-center mt-4">
            <Model>
              <Model.Open open={"KeepForm"}>
                <Button
                  variant="filled"
                  color="white"
                  className="bg-gray-400 text-gray-900"
                >
                  save
                </Button>
              </Model.Open>

              <Model.Window name={"KeepForm"}>
                <KeepForm />
              </Model.Window>
            </Model>
          </div>
        </div>
      </>
    );
  return (
    <Card className="grid h-full grid-rows-[auto_1fr] darkModeTop bg-gray-300 p-1 rounded-sm shadow-none">
      <form
        className="flex items-center  darkModeTop bg-gray-300 gap-4 p-1 "
        onSubmit={handleSubmit(handlSearch)}
      >
        <div className="pl-5">
          <Button
            size="md"
            variant="filled"
            type="submit"
            className="py-3 darkModeSubmit "
            color="blue"
          >
            جستجو
          </Button>
        </div>
        <div className="darkModeMiddle rounded-md">
          <Input
            type="date"
            color="blue"
            label="جستجو با تاریخ"
            {...register("date")}
            className="darkModeMiddle"
          />
        </div>
      </form>
      <div>
        <KeepTable />
        <div className="p-1">
          <Model>
            <Model.Open open={"SaleForm"}>
              <Button
                variant="filled"
                color="white"
                className="bg-gray-400 darkModeSubimt buttonText  text-gray-900"
              >
                ثبت
              </Button>
            </Model.Open>

            <Model.Window name={"SaleForm"}>
              <KeepForm />
            </Model.Window>
          </Model>
        </div>
      </div>
    </Card>
  );
}

export default KeepHoney;
