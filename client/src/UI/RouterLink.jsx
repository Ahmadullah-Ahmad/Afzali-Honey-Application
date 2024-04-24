import { Typography } from "@material-tailwind/react";
import { NavLink, useLocation } from "react-router-dom";

function RouterLink({ route, close }) {
  const { pathname } = useLocation();
  return (
    <>
      {route.map((el) => (
        <NavLink key={el.url} to={el.url}>
          <div
            className={`my-1 w-full rounded-lg ${
              pathname === `/${el.url}`
                ? "bg-blue-400 text-gray-50 dark:text-white"
                : "hover:bg-gray-400 dark:text-white hover:text-gray-50"
            } ${
              el.url.endsWith("account") ? "md:hidden" : ""
            } flex items-center justify-end py-2 px-3 text-center  capitalize `}
            onClick={close}
          >
            <Typography className=" text-base font-bold  capitalize">
              {el.path}
            </Typography>
            <span className="ml-3 px-1">{el?.icon}</span>
          </div>
        </NavLink>
      ))}
    </>
  );
}

export default RouterLink;
