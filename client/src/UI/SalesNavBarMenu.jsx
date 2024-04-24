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
    saleState: { sale = "" },
    saleDispatch,
  } = useSideBar();
  return (
    <Menu placement="bottom">
      <MenuHandler>
        <Card className="flex cursor-pointer flex-row items-center rounded-md bg-gray-200 py-1 px-2 shadow-sm">
          <Typography className="text-sm uppercase md:text-base">
            {sale}
          </Typography>
          <HiChevronDown size={30} className="px-1" />
        </Card>
      </MenuHandler>
      <MenuList>
        {routes.map((el) => (
          <MenuItem
            key={el.url}
            onClick={() => {
              saleDispatch({ type: el.url });
              setParams("type", el.url);
            }}
          >
            <Typography className="uppercase"> {el.text}</Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default MenuItemApp;

