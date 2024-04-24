import { useState } from "react";
import { MenuItem, Typography } from "@material-tailwind/react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Table from "../../UI/Table";
import Model from "../../UI/Model";
import ComfirmDelete from "../../UI/ComfirmDelete";
import { formatCurrency, formatQuantity } from "../../utils/helpers";
import { useDelete } from "./useDeleteProduct";
import { useUser } from "../Authentication/useUser";
import MenuLists from "../../UI/MenuLists";
function ProductRow({ item, borderKey }) {
  const className = `py-1 darkModeMiddle ${
    borderKey ? "" : "border-b border-blue-gray-50 dark:border-gray-900"
  }`;

  const { user } = useUser();
  const { Delete, isDeleting } = useDelete();

  const price = (item.advantage * item.salePrice) / 100 + item.salePrice;
  const advantage = ((item.advantage * item.salePrice) / 100) * item.quantity;
  const [openModel, setOpenModel] = useState(false);
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
                disabled={isDeleting}
              >
                <HiTrash size={20} className="" />
                <Typography className="px-4 font-medium uppercase  ">
                  حذف کردن
                </Typography>
              </MenuItem>
            ) : null}
            <div>
              <Model.Open open={"productEdit"} formData={item}>
                <MenuItem className="flex items-center ">
                  <HiPencil size={20} className="" />
                  <Typography className="px-4 font-medium uppercase  ">
                    تعغیر دان
                  </Typography>
                </MenuItem>
              </Model.Open>
            </div>
          </MenuLists>
        </td>
        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small" className="flex  flex-col">
            {formatCurrency(item.buyPrice)}
          </Typography>
        </td>
        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small" className="flex  flex-col">
            {formatCurrency(advantage.toFixed(0))}
          </Typography>
        </td>
        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small" className="relative flex flex-col">
            {formatCurrency(parseInt(price).toFixed(0))}
            <span className="absolute right-1 top-4 text-[10px] font-thin text-cyan-700">
              {parseInt(item.salePrice).toFixed(0)}
            </span>
          </Typography>
        </td>
        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small" className="flex  flex-col">
            {item.advantage} {" % "}
          </Typography>
        </td>
        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small">
            {item.type === "بوتل" && item.quantity + " دانه"}
            {item.type === "مچی" && item.quantity + " صندق"}
            {item.type !== "مچی" &&
              item.type !== "بوتل" &&
              formatQuantity(item.quantity)}
          </Typography>
        </td>
        <td className={`${className} capitalize `}>
          <Typography variant="small" className="text-lg">
            {item.type}
          </Typography>
        </td>
        <td className={`${className} capitalize`}>
          <Typography variant="small" className="pr-2 text-lg">
            {item.name}
          </Typography>
        </td>
      </Table.Row>

      <ComfirmDelete
        open={openModel}
        disabled={isDeleting}
        onDelete={deleteItem}
        resourceName={` جنس ${item.name} `}
        close={setOpenModel}
      />
    </>
  );
}

export default ProductRow;
