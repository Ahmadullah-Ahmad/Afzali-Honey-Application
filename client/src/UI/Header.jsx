import { Avatar, Card, CardBody } from "@material-tailwind/react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HiBars3,
  HiArrowLeftOnRectangle,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";
import MobileSideBar from "./MobileSideBar";
import Logo from "./Logo";
import { useState } from "react";
import { useLogOut } from "../features/Authentication/useLogOut";
import { useUser } from "../features/Authentication/useUser";
import { URL } from "../utils/constant";
import { useDarkMode } from "../Context/DarkModeContext";

function Header({ logo, urls, auth }) {
  const { pathname } = useLocation();
  const [openSide, setOpenSide] = useState(false);
  const close = () => setOpenSide(false);
  const { user } = useUser();
  const { logOut } = useLogOut();
  const { toggleDark, isDark } = useDarkMode();

  return (
    <Card className="darkModeMiddle flex  justify-center rounded-none   bg-gray-50 bg-inherit p-0 py-0 md:min-h-[calc(100dvh-90.5dvh)] md:p-0">
      <CardBody className={`  justify-center py-1 `}>
        <div className="grid grid-cols-[auto_1fr_auto]">
          <div className="flex items-center justify-end gap-x-3 ">
            {auth?.path && !user ? (
              <NavLink
                variant="text"
                className="rounded-md bg-blue-500 px-4 py-2 uppercase text-gray-100 hover:bg-blue-600"
                to={auth?.url}
              >
                {auth?.path}
              </NavLink>
            ) : (
              <>
                <div className="hidden items-center gap-1 md:flex">
                  <div className="flex items-center gap-x-2">
                    <NavLink
                      to={auth?.url}
                      className="px-2"
                      onClick={() => logOut()}
                    >
                      <HiArrowLeftOnRectangle
                        size={25}
                        className="hover:text-blue-800"
                      />
                    </NavLink>
                  </div>
                  <NavLink to={"/dashboard/account"}>
                    <Avatar
                      src={URL + user?.photo || "/vite.svg"}
                      alt="user"
                      className="rounded-full"
                      size="sm"
                    />
                  </NavLink>
                </div>
                <div className=" md:hidden">
                  <div className="flex items-center gap-x-3 ">
                    <NavLink to={"/dashboard/account"}>
                      <Avatar
                        src={URL + user?.photo || "/vite.svg"}
                        alt="user"
                        className="h-10 w-10 rounded-full"
                      />
                    </NavLink>
                  </div>
                  <MobileSideBar open={openSide} close={close} />
                </div>
              </>
            )}
            <div className="hidden md:block">
              {isDark ? (
                <HiOutlineMoon
                  size={25}
                  className="cursor-pointer "
                  onClick={() => toggleDark()}
                />
              ) : (
                <HiOutlineSun
                  size={25}
                  className="cursor-pointer"
                  onClick={() => toggleDark()}
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-evenly">
            <ul className=" flex items-center justify-end ">
              {urls?.map((el) => (
                <li
                  className={`px-2 text-lg font-extrabold sm:text-2xl md:px-5 ${
                    el?.path === "dashboard" ? "hidden md:block" : ""
                  }`}
                  key={el?.url}
                >
                  <NavLink
                    className={`${
                      pathname === el?.url && "text-blue-700"
                    } font-semibold uppercase`}
                    to={el?.url}
                  >
                    {el?.path}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className=" flex items-center gap-x-3 md:hidden">
            <HiBars3
              size={30}
              className="cursor-pointer"
              onClick={() => setOpenSide(true)}
            />{" "}
          </div>
          <div className="flex justify-center ">
            {logo ? (
              <Logo
                logo={logo}
                size="lg"
                classNames={"rounded-3xl hidden md:block"}
              />
            ) : null}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default Header;
