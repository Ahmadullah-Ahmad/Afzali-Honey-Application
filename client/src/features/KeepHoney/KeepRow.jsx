import { MenuItem, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { useState } from "react";
import { HiArrowTopRightOnSquare, HiPencil, HiTrash } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import MenuLists from "../../UI/MenuLists";
import Table from "../../UI/Table";
import ComfirmDelete from "../../UI/ComfirmDelete";
import { formatCurrency, formatQuantity } from "../../utils/helpers";
import { useDelete } from "./useDeleteKeeps";
import { useUser } from "../Authentication/useUser";
import Model from "../../UI/Model";
function KeepRow({ item, borderKey }) {
  const className = `py-1 darkModeMiddle ${
    borderKey ? "" : "border-b border-blue-gray-50 dark:border-gray-900"
  }`;

  const honey = item.Extract?.reduce((pre, curr) => curr.amount + pre, 0);

  const food = item.Food?.reduce(
    (pre, curr) => curr.price * curr.quantity + pre,
    0
  );
  const total = food + item.rent;

  const { user } = useUser();

  const [openModel, setOpenModel] = useState(false);
  const { Delete, isDeleting } = useDelete();
  function deleteItem() {
    Delete(item.id);
    setOpenModel(false);
  }
  const EditObj = {
    id: item.id,
    gardianName: item.gardianName,
    boxes: item.boxes,
    location: item.location,
    rent: item.rent,
  };
  return (
    <>
      <Table.Row>
        <td className={`${className} capitalize `}>
          <MenuLists>
            {user?.role !== "user" ? (
              <MenuItem
                onClick={() => setOpenModel((el) => !el)}
                className="flex items-center text-red-300 hover:text-red-300"
              >
                <HiTrash size={20} className="" />
                <Typography className="px-4 font-semibold  uppercase  ">
                  حذب کردن
                </Typography>
              </MenuItem>
            ) : null}
            <div>
              <Model.Open open={"EditKeep"} formData={EditObj}>
                <MenuItem className="flex items-center ">
                  <HiPencil size={20} className="" />
                  <Typography className="px-4 font-semibold uppercase  ">
                    تعغیرکردن
                  </Typography>
                </MenuItem>
              </Model.Open>
            </div>
            <MenuItem>
              <NavLink to={`${item.id}/details`} className="flex items-center ">
                <HiArrowTopRightOnSquare size={20} />
                <Typography className="px-4 font-semibold  uppercase  ">
                  جزئیات
                </Typography>
              </NavLink>
            </MenuItem>
          </MenuLists>
        </td>

        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small">{formatCurrency(total)} </Typography>
        </td>
        <td className={`${className} capitalize `}>
          <Typography variant="small">
            {format(new Date(item.createdAt), "MMM dd yyyy")}
          </Typography>
        </td>

        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small">{formatCurrency(item.rent)}</Typography>
        </td>
        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small">{formatQuantity(honey)} </Typography>
        </td>
        <td className={`${className} capitalize `}>
          <Typography variant="small" className="text-lg">
            {item.location}
          </Typography>
        </td>

        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small">{formatCurrency(food)}</Typography>
        </td>
        <td className={`${className} capitalize`}>
          <Typography variant="small">{item.boxes}</Typography>
        </td>
        <td className={`${className} capitalize  pr-2`}>
          <Typography variant="small" className="text-lg">
            {item.gardianName}
          </Typography>
        </td>
      </Table.Row>
      <ComfirmDelete
        open={openModel}
        disabled={isDeleting}
        onDelete={deleteItem}
        resourceName="معلومات "
        close={setOpenModel}
      />
    </>
  );
}

export default KeepRow;
