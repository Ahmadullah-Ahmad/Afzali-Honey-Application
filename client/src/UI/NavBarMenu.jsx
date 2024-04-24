import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Card,
} from "@material-tailwind/react";
import { HiChevronDown } from "react-icons/hi2";
import { useSideBar } from "../Context/SideBar";
import useSetParams from "../hooks/useSetParams";

function MenuItemApp({ routes }) {
  const { setParams } = useSetParams();

  const {
    productState: { product },
    productDispatch,
  } = useSideBar();
  return (
    <div className="w-32 ">
      <Menu placement="bottom" className="">
        <MenuHandler>
          <Card className="darkModeMiddle flex cursor-pointer flex-row items-center justify-between rounded-md bg-gray-200 px-2 py-1 shadow-sm">
            <Typography className="text-sm font-semibold uppercase md:text-base">
              {product}
            </Typography>
            <HiChevronDown size={30} className="px-1" />
          </Card>
        </MenuHandler>
        <MenuList className="darkModeTop">
          {routes.map((el) => (
            <MenuItem
              key={el}
              onClick={() => {
                productDispatch({ type: el });
                setParams("type", el === "همه" ? "" : el);
              }}
            >
              <Typography className="font-semibold uppercase"> {el}</Typography>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}

export default MenuItemApp;
