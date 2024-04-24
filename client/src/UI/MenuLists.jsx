import {
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
} from "@material-tailwind/react";
import { HiEllipsisVertical } from "react-icons/hi2";

function MenuLists({ children }) {
  return (
    <Menu placement="left-start">
      <MenuHandler>
        <IconButton
          size="sm"
          variant="text"
          className="darkModeMiddle"
          color="gray"
        >
          <HiEllipsisVertical
            strokeWidth={0.5}
            className="h-6 w-6 darkModeMiddle font-semibold text-gray-700"
          />
        </IconButton>
      </MenuHandler>
      <MenuList className=" w-11 darkModeButtom" color="blue">
        {children}
      </MenuList>
    </Menu>
  );
}

export default MenuLists;
