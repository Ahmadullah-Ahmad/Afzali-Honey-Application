import { Card, Typography } from "@material-tailwind/react";
import { useUser } from "../features/Authentication/useUser";
import Logo from "./Logo";
import MobileSideBar from "./MobileSideBar";
import RouterLink from "./RouterLink";
import { route } from "./routes";
function SideBar() {
  const { user } = useUser();
  const filterRouter =
    user?.role === "admin"
      ? route
      : route.filter(
          (el) =>
            el.path !== "نمایندگی" &&
            el.path !== "کارمندان" &&
            el.path !== "مصارف" &&
            el.path !== "ریپورت",
        );
  return (
    <>
      <Card className=" darkModeMiddle grid h-full grid-rows-[auto_1fr] rounded-sm bg-gray-50 shadow-none">
        <div className="flex h-24 items-center justify-center p-3 shadow-sm">
          <div className="flex flex-col text-center dark:text-white">
            <Logo
              logo={"/image/logo.jpg"}
              size="lg"
              classNames={"rounded-full"}
            />

            <Typography className="font-semibold">افضلی عسل فروشی</Typography>
          </div>
        </div>
        <div className="p-1 ">
          <RouterLink route={filterRouter} />
        </div>
      </Card>
      <MobileSideBar />
    </>
  );
}

export default SideBar;
