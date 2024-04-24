import { Spinner, Typography } from "@material-tailwind/react";
import Table from "../../UI/Table";
import CustomerRow from "./CustomerRow";
import { useCustomers } from "./useGetCustomer";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../UI/Pagination";
import Model from "../../UI/Model";
import CustomerForm from "./CustomerForm";
const customerHeader = ["نام", "شماره", "فروش", "خرید", ""].reverse();
function CustomerTable() {
  const { Customers, count, isLoading } = useCustomers();
  const LoanOnMe = count
    ?.map((loan) =>
      loan?.purchase
        ?.filter((el) => el?.pay === false)
        ?.reduce((pre, cur) => pre + cur.price * cur.quantity, 0)
    )
    .reduce((pre, cur) => pre + cur, 0);

  const LoanOnCustomer = count
    ?.map((loan) =>
      loan?.Sales?.filter((el) => el?.pay === false)?.reduce(
        (pre, cur) => pre + cur.price * cur.quantity,
        0
      )
    )
    .reduce((pre, cur) => pre + cur, 0);
  // console.log(Customers, count, LoanOnCustomer);
  const [searchParams, setSearchParams] = useSearchParams();
  if (Customers?.length === 0) {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  if (isLoading)
    return (
      <Spinner
        className="h-16 w-16 absolute backdrop-blur-sm top-[50%] left-[50%] "
        color="blue"
      />
    );
  return (
    <div className="rounded-sm darkModeTop p-1 bg-gray-300">
      <Model>
        <Table>
          <Table.Header>
            {customerHeader?.map((el, index) => (
              <td className="py-2 darkModeMiddle" key={index}>
                <Typography
                  variant="small"
                  className={`font-semibold uppercase text-lg ${
                    index === 4 ? "pr-2" : ""
                  }`}
                >
                  {el}
                </Typography>
              </td>
            ))}
          </Table.Header>
          <Table.Body>
            {Customers?.map((el, index) => (
              <CustomerRow
                item={el}
                key={el.id}
                borderKey={index === Customers?.length - 1}
              />
            ))}
          </Table.Body>
          <Table.Footer>
            <Pagination count={count?.length} />
          </Table.Footer>
        </Table>
        <Model.Window name={"editCustomer"}>
          <CustomerForm />
        </Model.Window>
      </Model>
      <div className="flex justify-between flex-col sm:flex-row px-2 capitalize">
        {/* <Typography>Total loan on Me: {formatCurrency(LoanOnMe)}</Typography> */}
        <Typography>
          <span className="font-semibold px-3"> مجموعه قرض به ما :</span>
          {LoanOnMe} <span className="font-medium px-1">افغانی</span>
        </Typography>
        <Typography>
          <span className="font-semibold px-3"> مجموعه قرض به مشتری :</span>
          {LoanOnCustomer} <span className="font-medium px-1">افغانی</span>
        </Typography>
      </div>
    </div>
  );
}

export default CustomerTable;
