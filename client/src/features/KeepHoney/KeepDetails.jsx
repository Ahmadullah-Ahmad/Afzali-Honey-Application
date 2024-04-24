import { Button, Card, Spinner } from "@material-tailwind/react";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { DetailsCard } from "./DetailsCard";
import FoodTable from "../Food/FoodTable";
import FoodForm from "../Food/FoodForm";
import HoneyTable from "../ExtractHoney/HoneyTable";
import HoneyForm from "../ExtractHoney/HoneyForm";
import { useKeepOne } from "./useGetOneKeep";
import { format } from "date-fns";
import Model from "../../UI/Model";
import { Back } from "../../hooks/Back";
function KeepDetails() {
  const { keepOne, isLoading } = useKeepOne();
  const { goBack } = Back();
  if (isLoading)
    return (
      <div className="flex items-center h-[100dvh] w-full justify-center">
        <Spinner className="h-16 w-16 " color="blue" />
      </div>
    );

  return (
    <Card className=" rounded-sm h-full darkModeTop bg-gray-300 p-2 shadow-none ">
      <HiOutlineArrowLeft
        size={25}
        className="hover:text-blue-500 cursor-pointer"
        onClick={() => goBack()}
      />
      <Model>
        <div className="flex justify-between md:flex-row flex-col">
          <DetailsCard
            title={"تاریخ"}
            value={
              keepOne?.createdAt
                ? format(new Date(keepOne?.createdAt), "yyyy-MM-dd")
                : null
            }
          />
          <DetailsCard title={"صندق"} value={keepOne?.boxes} />
          <DetailsCard title={"کرایه"} value={keepOne?.rent} />
          <DetailsCard title={"کارمند"} value={keepOne?.gardianName} />
        </div>
        <div className="md:grid md:grid-cols-[1fr_0.8fr] sm:flex sm:flex-col gap-2 pt-2 flex-col md:flex-row">
          <div>
            <FoodTable Food={keepOne?.Food} keepId={keepOne?.id} />
            <div
              className={`p-1 ${
                keepOne?.Food.length === 0 ? "text-center" : ""
              }`}
            >
              <Model.Open open={"FoodWindow"}>
                <Button
                  variant="filled"
                  color="white"
                  className="bg-gray-400 darkModeSubimt buttonText text-gray-900"
                >
                  ثبت کردن غذا
                </Button>
              </Model.Open>
              <Model.Window name={"FoodWindow"}>
                <FoodForm keepId={keepOne?.id} />
              </Model.Window>
            </div>
          </div>
          <div>
            <HoneyTable Extract={keepOne?.Extract} keepId={keepOne?.id} />
            <div
              className={`p-1 ${
                keepOne?.Extract.length === 0 ? "text-center" : ""
              }`}
            >
              <Model.Open open={"HoneyWindow"}>
                <Button
                  variant="filled"
                  color="white"
                  className="bg-gray-400 darkModeSubimt buttonText  text-gray-900"
                >
                  ثبت کردن عسل
                </Button>
              </Model.Open>
              <Model.Window name={"HoneyWindow"}>
                <HoneyForm keepId={keepOne?.id} />
              </Model.Window>
            </div>
          </div>
        </div>
      </Model>
    </Card>
  );
}

export default KeepDetails;
