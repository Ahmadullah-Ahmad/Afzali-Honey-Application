import { Button, Card, Spinner, Typography } from "@material-tailwind/react";
import AcountInfo from "./AcountInfo";
import { URL } from "../../utils/constant";
import { useUser } from "../Authentication/useUser";
import Model from "../../UI/Model";
function AccountCard() {
  const { user, isLoading } = useUser();
  if (isLoading)
    return (
      <div className="flex items-center h-[100dvh] w-full justify-center">
        <Spinner className="h-16 w-16 " color="blue" />
      </div>
    );
  return (
    <Card className="h-full rounded-sm w-full p-1 flex md:flex-row justify-evenly gap-x-6 darkModeTop  bg-gray-300 ">
      <div className="flex items-center justify-center  ">
        <img
          src={URL + user?.photo || "/default.jpg"}
          alt="User"
          className="self-center rounded-md md:w-full h-60 fill-current shadow-sm"
        />
      </div>
      <div className="flex flex-col md:mt-8 mt-3  items-center ">
        <div className="items-center text-right">
          <div>
            <Typography variant="lead" className="font-semibold">
              نمائنده گی :
              <span className="px-2 font-normal capitalize">
                {user?.branch?.name}
              </span>
            </Typography>
          </div>
          <div className="md:py-2">
            {" "}
            <Typography variant="lead" className="font-semibold">
              نام :
              <span className="px-2 font-normal capitalize">{user?.name}</span>
            </Typography>
          </div>
          <div>
            {" "}
            <Typography variant="lead" className="font-semibold">
              <span className="px-2 font-normal">{user?.username}</span>: نام
              کاربرد
            </Typography>
          </div>
          <div className="flex justify-end pt-3">
            <Model>
              <Model.Open open={"UpdateMe"}>
                <Button color="blue" className="font-semibold buttonText">
                  ثبت
                </Button>
              </Model.Open>
              <Model.Window name={"UpdateMe"}>
                <AcountInfo />
              </Model.Window>
            </Model>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AccountCard;
