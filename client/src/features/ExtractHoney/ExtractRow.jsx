import { MenuItem, Typography } from "@material-tailwind/react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Table from "../../UI/Table";
import { format } from "date-fns";
import Model from "../../UI/Model";
import { useDelete } from "./useDeleteExtract";
import { useState } from "react";
import ComfirmDelete from "../../UI/ComfirmDelete";
import { useUser } from "../Authentication/useUser";
import MenuLists from "../../UI/MenuLists";
import { formatQuantity } from "../../utils/helpers";

function ExtractRow({ item, borderKey }) {
  const className = `py-2 border-b darkModeMiddle`;

  const { user } = useUser();

  const [openModel, setOpenModel] = useState(false);
  const { Delete, isDeleting } = useDelete();
  function deleteItem() {
    Delete(item.id);
    setOpenModel(false);
  }

  const EditObj = {
    id: item?.id,
    amount: item?.amount,
    productId: item?.product?.id,
    type: item?.product?.type,
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
                  حذب کردی
                </Typography>
              </MenuItem>
            ) : null}
            <div>
              <Model.Open open={"editExract"} formData={EditObj}>
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

        <td className={`${className} capitalize`} dir="rtl">
          <Typography variant="small">
            {formatQuantity(item?.amount)}
          </Typography>
        </td>

        <td className={`${className} pr-2 capitalize`}>
          <Typography variant="small" className="text-lg">
            {item?.product?.type || ""}
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

export default ExtractRow;
