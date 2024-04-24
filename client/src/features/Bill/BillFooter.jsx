import { Typography } from "@material-tailwind/react";
import { formatCurrency } from "../../utils/helpers";

function BillFooter({ total }) {
  return (
    <>
      <div className="flex justify-between">
        <Typography className="text-xl">
          مجموعه : {formatCurrency(total)}
        </Typography>
      </div>
      <hr />
      <p className="text-right font-medium">
        !نوت : جنس فروخته شده واپس گرفته نمی شود، بل هذا بدون مهر و امضاء مدار
        عتبار نست
      </p>
    </>
  );
}

export default BillFooter;
