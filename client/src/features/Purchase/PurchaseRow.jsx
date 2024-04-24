import { MenuItem, Typography } from "@material-tailwind/react";
import { format, differenceInHours, parseISO } from "date-fns";
import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi2";

import { useUser } from "../Authentication/useUser";
import ComfirmDelete from "../../UI/ComfirmDelete";
import Model from "../../UI/Model";
import Table from "../../UI/Table";
import { formatCurrency, formatQuantity } from "../../utils/helpers";
import { useDelete } from "./useDeletePurchase";
import MenuLists from "../../UI/MenuLists";
import Notification from "../../UI/Notification";
// quantity,price,pay,createdAt,location
function PurchaseRow({ item, borderKey }) {
  const className = ` darkModeMiddle ${
    borderKey ? "" : "border-b border-blue-gray-50 dark:border-gray-900"
  }`;
  const { user } = useUser();
  const date = new Date();

  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const total = item.price * item.quantity;
  console.log(item);
  // price,quantity,location,pay,productName,productType,customerName,phone
  const editObj = {
    id: item.id,
    customerName: item?.customer?.name,
    phone: item?.customer?.phone,
    productType: item?.product?.type,
    productName: item?.product?.name,
    pay: item.pay,
    location: item.location,
    quantity: item.quantity,
    price: item.price,
    deadline: item.deadline,
  };
  const [openModel, setOpenModel] = useState(false);

  const { Delete, isDeleting } = useDelete();
  function deleteItem() {
    Delete(item.id);
    setOpenModel(false);
  }
  return (
    <>
      <Table.Row>
        <td className={`${className}  relative `}>
          <MenuLists>
            {user?.role !== "user" ? (
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
              </>
            ) : null}

            <div>
              <Model.Open open={"purchaseEdit"} formData={editObj}>
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

        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small">{formatCurrency(total)} </Typography>
        </td>
        <td
          className={`${className} relative hidden capitalize md:block`}
          dir="rtl"
        >
          <Typography variant="small" className="mb-[3px] " dir="rtl">
            {format(new Date(item.deadline), "yyyy-MM-dd")}
          </Typography>
        </td>

        <td className={`${className} relative capitalize `} dir="rtl">
          <Typography variant="small" className={``}>
            {formatCurrency(item.price)}{" "}
            <span
              className={`absolute bottom-0 right-2 text-[10px]  ${
                item?.pay ? "text-blue-300" : "text-red-300"
              }`}
            >
              {item.pay ? "" : "(قرض)"}
            </span>
          </Typography>
        </td>
        <td className={`${className} hidden capitalize md:block`}>
          <Typography variant="small" className="mb-[3px] " dir="rtl">
            {format(new Date(item.createdAt), "yyyy-MM-dd")}
          </Typography>
        </td>
        <td className={`${className} capitalize `} dir="rtl">
          <Typography variant="small">
            {formatQuantity(item.quantity)}
          </Typography>
        </td>

        <td className={`${className}  hidden capitalize md:block md:pt-[15px]`}>
          <Typography variant="small" className="text-lg">
            {item.location}
          </Typography>
        </td>
        <td className={`${className} capitalize `}>
          <Typography variant="small" className="text-lg">
            {item?.product?.name}
          </Typography>
        </td>

        <td className={`${className} pr-2 capitalize`}>
          {item.customer?.name ? (
            <Typography variant="small">{item.customer?.name}</Typography>
          ) : (
            ""
          )}
          {item.customer?.phone ? (
            <Typography variant="small" className="text-gray-500 ">
              {item.customer?.phone}
            </Typography>
          ) : (
            ""
          )}
        </td>
      </Table.Row>

      <ComfirmDelete
        open={openModel}
        disabled={isDeleting}
        onDelete={deleteItem}
        resourceName="معلومات "
        close={setOpenModel}
      />
      <Notification
        open={open}
        close={close}
        customer={item.customer?.name}
        createdDate={format(new Date(item.createdAt), "yyyy-dd-MMM")}
        product={item?.product?.name}
        deadline={format(new Date(item.deadline), "yyyy-dd-MMM")}
        price={formatCurrency(item.price)}
      />
    </>
  );
}

export default PurchaseRow;
