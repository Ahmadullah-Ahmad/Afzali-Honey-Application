import { MenuItem, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { HiArrowTopRightOnSquare, HiPencil, HiTrash } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import Model from "../../UI/Model";
import Table from "../../UI/Table";
import MenuLists from "../../UI/MenuLists";
import ComfirmDelete from "../../UI/ComfirmDelete";
import { formatCurrency } from "../../utils/helpers";
import { useDelete } from "./useDeleteCustomer";
import { useUser } from "../Authentication/useUser";

function KeepRow({ item, borderKey }) {
  const className = `py-1 text-lg darkModeMiddle ${
    borderKey ? "" : "border-b border-blue-gray-50 dark:border-gray-900"
  }`;

  const { user } = useUser();

  const totalSale = item.Sales?.reduce((pre, curr) => {
    return pre + curr?.price * curr.quantity;
  }, 0);

  const totalPruchase = item.purchase?.reduce((pre, curr) => {
    return pre + curr?.price * curr.quantity;
  }, 0);

  const [openModel, setOpenModel] = useState(false);
  const { Delete, isDeleting } = useDelete();

  function deleteItem() {
    Delete(item.id);
    setOpenModel(false);
  }

  const EditObj = {
    id: item.id,
    name: item.name,
    phone: item.phone,
  };
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
                  حذب کردن
                </Typography>
              </MenuItem>
            ) : null}
            <div>
              <Model.Open open={"editCustomer"} formData={EditObj}>
                <MenuItem className="flex items-center ">
                  <HiPencil size={20} className="" />
                  <Typography className="px-4 font-semibold uppercase  ">
                    تعغیر کردن
                  </Typography>
                </MenuItem>
              </Model.Open>
            </div>
            <MenuItem>
              <NavLink to={`${item.id}/details`} className="flex items-center ">
                <HiArrowTopRightOnSquare size={20} />
                <Typography className="px-4 font-semibold uppercase  ">
                  جزئيات
                </Typography>
              </NavLink>
            </MenuItem>
          </MenuLists>
        </td>

        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small">
            {formatCurrency(totalPruchase)}
          </Typography>
        </td>
        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small">{formatCurrency(totalSale)}</Typography>
        </td>

        <td className={`${className} capitalize`}>
          <Typography variant="small">{item.phone}</Typography>
        </td>
        <td className={`${className} capitalize  pr-2`}>
          <Typography variant="small" className="text-lg">
            {item.name}
          </Typography>
        </td>
      </Table.Row>
      <ComfirmDelete
        open={openModel}
        disabled={isDeleting}
        onDelete={deleteItem}
        resourceName="معلومات مشتری "
        close={setOpenModel}
      />
    </>
  );
}

export default KeepRow;
