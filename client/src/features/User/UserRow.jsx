import { Avatar, MenuItem, Typography } from "@material-tailwind/react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Table from "../../UI/Table";
import ComfirmDelete from "../../UI/ComfirmDelete";
import { format } from "date-fns";
import { URL } from "../../utils/constant";
import { useState } from "react";
import Model from "../../UI/Model";
import { useDelete } from "./useDeleteUser";
import MenuLists from "../../UI/MenuLists";

function BranchRow({ item, borderKey }) {
  const className = "py-1 darkModeMiddle";

  const EditObj = {
    id: item.id,
    name: item.name,
    role: item.role,
    branchId: item?.branch?.id,
  };
  let role;
  if (item.role === "admin") role = "رئس";
  if (item.role === "user") role = "کارمند";
  if (item.role === "manager") role = "مدیر";
  const { Delete, isDeleting } = useDelete();
  const [openModel, setOpenModel] = useState(false);
  function deleteItem() {
    Delete(item.id);
    setOpenModel(false);
  }

  return (
    <>
      <Table.Row>
        <td className={`${className} `}>
          {item.role === "admin" ? (
            ""
          ) : (
            <MenuLists>
              <>
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
                  <Model.Open open={"userEdit"} formData={EditObj}>
                    <MenuItem className="flex items-center ">
                      <HiPencil size={20} className="" />
                      <Typography className="px-4 font-semibold uppercase  ">
                        تعغیر کردن
                      </Typography>
                    </MenuItem>
                  </Model.Open>
                </div>
              </>
            </MenuLists>
          )}
        </td>
        <td className={`${className} capitalize`}>
          <Typography variant="small" className="text-lg">
            {item?.branch?.location}
          </Typography>
        </td>

        <td className={`${className} capitalize `}>
          <Typography variant="small" className="text-lg">
            {item?.branch?.name}
          </Typography>
        </td>
        <td className={`${className}  capitalize `}>
          <Typography variant="small">
            {format(new Date(item?.createdAt), "yyyy-MM-dd")}
          </Typography>
        </td>

        <td className={`${className} capitalize`}>
          <Typography variant="small" className="text-lg">
            {role}
          </Typography>
        </td>
        <td className={`${className} capitalize`}>
          <Typography variant="small" className="text-lg">
            {item.name}
          </Typography>
        </td>
        <td className={`${className}   px-2 `}>
          <Avatar src={URL + item.photo || "default.jpg"} />
        </td>
      </Table.Row>
      <ComfirmDelete
        open={openModel}
        disabled={isDeleting}
        onDelete={deleteItem}
        resourceName={` ${item.name} `}
        close={setOpenModel}
      />
    </>
  );
}

export default BranchRow;
