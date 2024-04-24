import { Card } from "@material-tailwind/react";
import KeepDetails from "../features/KeepHoney/KeepDetails";
import { useKeepOne } from "../features/KeepHoney/useGetOneKeep";
import { HiArrowLeft } from "react-icons/hi2";
import { Back } from "../hooks/Back";
import Empty from "../UI/Empty";
function Details() {
  const { keepOne } = useKeepOne();
  const { goBack } = Back();
  if (!keepOne)
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
        </div>
      </>
    );
  return (
    <Card className=" rounded-sm h-full darkModeTop bg-gray-300 p-2 shadow-none ">
      <KeepDetails />
    </Card>
  );
}

export default Details;
