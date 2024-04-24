import { MenuItem, Typography } from "@material-tailwind/react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Table from "../../UI/Table";
import { formatCurrency } from "../../utils/helpers";
import { format } from "date-fns";
import Model from "../../UI/Model";
import { useState } from "react";
import ComfirmDelete from "../../UI/ComfirmDelete";
import { useDelete } from "./useDeleteBranch";
import MenuLists from "../../UI/MenuLists";

function BranchRow({ item, borderKey }) {
  const className = `py-1 darkModeMiddle ${
    borderKey ? "" : "border-b border-blue-gray-50 dark:border-gray-900"
  }`;

  const total = item?.Product?.reduce(
    (pre, cur) => pre + cur.quantity * cur.salePrice,
    0,
  );

  const [openModel, setOpenModel] = useState(false);
  const { Delete, isDeleting } = useDelete();
  function deleteItem() {
    Delete(item.id);
    setOpenModel(false);
  }

  const EditObj = {
    id: item.id,
    name: item.name,
    location: item.location,
    phone: item.phone,
  };
  return (
    <>
      <Table.Row>
        <td className={`${className} `}>
          <MenuLists>
            <MenuItem
              onClick={() => setOpenModel((el) => !el)}
              className="flex items-center text-red-300 hover:text-red-300"
            >
              <HiTrash size={20} className="" />
              <Typography className="px-4 font-semibold uppercase  ">
                حذب کردن
              </Typography>
            </MenuItem>
            <div>
              <Model.Open open={"branchEdit"} formData={EditObj}>
                <MenuItem className="flex items-center ">
                  <HiPencil size={20} className="" />
                  <Typography className="px-4 font-semibold uppercase  ">
                    تعغیرکردن
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

        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small">{formatCurrency(total)}</Typography>
        </td>

        <td className={`${className} capitalize`}>
          <Typography variant="small">{item?.phone || "ندارد"}</Typography>
        </td>
        <td className={`${className} capitalize`}>
          <Typography variant="small" className="text-lg">
            {item?.location}
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
        resourceName={` نماییده گی ${item.name} `}
        close={setOpenModel}
      />
    </>
  );
}

export default BranchRow;
