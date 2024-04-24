import { MenuItem, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import ComfirmDelete from "../../UI/ComfirmDelete";
import Model from "../../UI/Model";
import Table from "../../UI/Table";
import MenuLists from "../../UI/MenuLists";
import { formatCurrency } from "../../utils/helpers";
import { useDelete } from "./useDeleteExpenses";
import { useUser } from "../Authentication/useUser";

function ExpensesRow({ item, borderKey }) {
  const className = `py-1 darkModeMiddle font-semibold ${
    borderKey ? "" : "border-b border-blue-gray-50 dark:border-gray-900"
  }`;

  const { user } = useUser();
  const [openModel, setOpenModel] = useState(false);
  const { Delete, isDeleting } = useDelete();
  function deleteItem() {
    Delete(item.id);
    setOpenModel(false);
  }
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
                <Typography className="px-4 font-semibold uppercase  ">
                  حذب کردن
                </Typography>
              </MenuItem>
            ) : null}
            <div>
              <Model.Open open={"expendEdit"} formData={item}>
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

        <td className={`${className} capitalize `}>
          <Typography variant="small">
            {format(new Date(item.createdAt), "yyyy-MM-dd")}
          </Typography>
        </td>
        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small">
            {formatCurrency(item.amount)}{" "}
          </Typography>
        </td>
        <td className={`${className} capitalize `}>
          <Typography variant="small" className="text-lg">
            {item.reason}
          </Typography>
        </td>
        <td className={`${className} capitalize  px-2`}>
          <Typography variant="small" className="text-lg">
            {item.taker}
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

export default ExpensesRow;
