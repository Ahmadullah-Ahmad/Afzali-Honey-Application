import { createPortal } from "react-dom";
import { Card, Drawer, Typography } from "@material-tailwind/react";
import { route } from "./routes";
import Logo from "./Logo";
import RouterLink from "./RouterLink";
import { useUser } from "../features/Authentication/useUser";
import { useNavigate } from "react-router-dom";
import {
  HiArrowRightOnRectangle,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";
import { useLogOut } from "../features/Authentication/useLogOut";
import { useDarkMode } from "../Context/DarkModeContext";

function MobileSideBar({ open = false, close }) {
  const navigate = useNavigate();
  const { toggleDark, isDark } = useDarkMode();
  const { logOut } = useLogOut();
  const { user } = useUser();
  const filterRouter =
    user.role === "admin"
      ? route
      : route.filter((el) => el.path !== "branch" && el.path !== "users");
  return createPortal(
    <Drawer open={open} size={200} onClose={close} placement="right">
      <Card className=" darkModeMiddle z-[999]  grid h-full transform grid-rows-[auto_auto_auto] flex-col rounded-sm  bg-gray-300 transition-all duration-1000">
        <div className="flex  flex-col items-center">
          <div className="absolute left-3 top-2">
            {isDark ? (
              <HiOutlineMoon
                className="cursor-pointer"
                size={20}
                onClick={() => toggleDark()}
              />
            ) : (
              <HiOutlineSun
                className="cursor-pointer"
                size={20}
                onClick={() => toggleDark()}
              />
            )}
          </div>
          <div
            onClick={() => {
              navigate("/home");
              close();
            }}
          >
            <Logo classNames={"rounded-full"} to="dashboard/home" />
          </div>
          <Typography className="pt-3">شرکت عسل فروشی افضلی</Typography>
        </div>
        <div className="px-1">
          <RouterLink route={filterRouter} close={close} />
        </div>
        <div
          className="my-1 flex w-full cursor-pointer items-center justify-end rounded-lg px-3 py-2 text-center capitalize hover:bg-gray-400  hover:text-gray-50 dark:text-white"
          onClick={() => {
            navigate("/login");
            logOut();
            close();
          }}
        >
          <Typography className="font-semibold capitalize">خارج شدن</Typography>
          <span className="mr-3 px-1">
            <HiArrowRightOnRectangle size={30} />
          </span>
        </div>
      </Card>
    </Drawer>,
    document.body,
  );
}

export default MobileSideBar;
