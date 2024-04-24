import { Button, Card, Spinner } from "@material-tailwind/react";
import { Navigate } from "react-router-dom";
import { useUser } from "../features/Authentication/useUser";
import BranchForm from "../features/Branch/BranchForm";
import BranchTable from "../features/Branch/BranchTable";
import Model from "../UI/Model";
import Empty from "../UI/Empty";
import { Back } from "../hooks/Back";
import { useBranchs } from "../features/Branch/useGetBranches";
import { HiArrowLeft } from "react-icons/hi2";
function Branch() {
  
  const { user } = useUser();
  const { branches, isLoading } = useBranchs();
  const { goBack } = Back();
  if (isLoading)
    return (
      <Spinner
        className="h-16 w-16 absolute backdrop-blur-sm top-[50%] left-[50%] "
        color="blue"
      />
    );
  if (branches?.length === 0)
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
          <Empty data={"نمائنده گی"} />
          <div className="px-2 flex justify-center mt-4">
            <Model>
              <Model.Open open={"branch"}>
                <Button
                  variant="filled"
                  color="white"
                  className="bg-gray-400 text-gray-900 darkModeSubimt buttonText"
                >
                  افزودن‌ نمائنده گی{" "}
                </Button>
              </Model.Open>

              <Model.Window name={"branch"}>
                <BranchForm />
              </Model.Window>
            </Model>
          </div>
        </div>
      </>
    );
  return user?.role === "admin" ? (
    <Card className=" rounded-sm h-full darkModeTop border-b-2 bg-gray-300 p-2 shadow-none ">
      <BranchTable />
      <div className="pr-4">
        <Model>
          <Model.Open open={"branch"}>
            <Button
              variant="filled"
              color="white"
              className="bg-gray-400 darkModeSubimt buttonText  text-gray-900"
            >
              افزودن‌ نمائنده گی
            </Button>
          </Model.Open>
          <Model.Window name={"branch"}>
            <BranchForm />
          </Model.Window>
        </Model>
      </div>
    </Card>
  ) : (
    <Navigate to={"/home"} />
  );
}

export default Branch;
