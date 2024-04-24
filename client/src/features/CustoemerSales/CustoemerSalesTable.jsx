import { Typography } from "@material-tailwind/react";
import Table from "../../UI/Table";
import CustomerSaleRow from "./CustomerSaleRow";
const customerSaleHeader = ["نام", "مقدار", "قیمت", "تاریخ"].reverse();

function CustoemerSalesTable({ product, count }) {
  if (product?.length === 0)
    return (
      <div>
        <Typography variant="h5" className="text-center uppercase">
          اجانس فروخته شده به مشتری
        </Typography>

        <Typography className="mt-8 flex items-center justify-center py-4 text-xl  font-bold uppercase text-red-200">
          اجانس فروخته شده به ندارد
        </Typography>
      </div>
    );
  return (
    <div>
      <Typography variant="h5" className="text-center">
        اجانس فروخته شده به مشتری
      </Typography>
      <div className="">
        <Table>
          <Table.Header>
            {customerSaleHeader?.map((el, index) => (
              <td className="darkModeMiddle py-3" key={index}>
                <Typography
                  variant="small"
                  className={`font-semibold uppercase ${
                    index === 3 ? "pr-2" : ""
                  }`}
                >
                  {el}
                </Typography>
              </td>
            ))}
          </Table.Header>
          <Table.Body>
            {product?.map((el, index) => (
              <CustomerSaleRow
                item={el}
                key={el.id}
                borderKey={index === product?.length - 1}
              />
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default CustoemerSalesTable;
