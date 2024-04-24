import { MenuItem, Typography } from "@material-tailwind/react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Table from "../../UI/Table";
import { formatCurrency, formatQuantity } from "../../utils/helpers";
import { format } from "date-fns";
import Model from "../../UI/Model";
import MenuLists from "../../UI/MenuLists";
import { useState } from "react";
import { useDelete } from "./useDeleteFood";
import ComfirmDelete from "../../UI/ComfirmDelete";
import { useUser } from "../Authentication/useUser";

function FoodRow({ item, borderKey, keepId }) {
  const className = `py-2 ${borderKey ? "" : "border-b border-blue-gray-50"}`;

  const { user } = useUser();
  const [openModel, setOpenModel] = useState(false);
  const { Delete, isDeleting } = useDelete();
  const total = item.quantity * item.price;
  const deleteObj = { id: item?.id, keepId };
  function deleteItem() {
    Delete(deleteObj);
    setOpenModel(false);
  }

  return (
    <>
      <Table.Row>
        <td className={`${className} `}>
          <MenuLists>
            {user?.role !== "user" ? (
              <MenuItem
                onClick={() => setOpenModel((el) => !el)}
                className="flex items-center text-red-300 hover:text-red-300"
              >
                <HiTrash size={20} className="" />
                <Typography className="px-4 font-semibold uppercase  ">
                  حذب کردی
                </Typography>
              </MenuItem>
            ) : null}
            <div>
              <Model.Open open={"editFood"} formData={item}>
                <MenuItem className="flex items-center ">
                  <HiPencil size={20} className="" />
                  <Typography className="px-4 font-semibold uppercase  ">
                    تعغیر کردن
                  </Typography>
                </MenuItem>
              </Model.Open>
            </div>
          </MenuLists>
        </td>

        <td className={`${className} capitalize`}>
          <Typography variant="small">
            {format(new Date(item?.createdAt), "yyyy-MM-dd")}
          </Typography>
        </td>
        <td className={`${className} capitalize`}>
          <Typography variant="small" dir="rtl">
            {formatCurrency(total)}
          </Typography>
        </td>
        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small">{formatCurrency(item?.price)}</Typography>
        </td>

        <td className={`${className} capitalize`} dir="rtl">
          <Typography variant="small">
            {formatQuantity(item?.quantity)}
          </Typography>
        </td>
        <td className={`${className} pr-2 capitalize`}>
          <Typography variant="small" className="text-lg">
            {item.name}
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

export default FoodRow;
