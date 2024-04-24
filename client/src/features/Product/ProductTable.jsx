import { Spinner, Typography } from "@material-tailwind/react";
import Table from "../../UI/Table";
import Pagination from "../../UI/Pagination";
import CategoryRow from "./ProductRow";
import ProductForm from "./ProductForm";
import { useProducts } from "./useGetProducts";
import Model from "../../UI/Model";
import { useSearchParams } from "react-router-dom";
import Empty from "../../UI/Empty";
const header = [
  "نام",
  "نوع",
  "مقدار",
  "فصدی",
  "فرش",
  "فایده",
  "خرید",
  "",
].reverse();

function ProductTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, count, isLoading } = useProducts();

  if (isLoading)
    return (
      <Spinner
        className="h-16 w-16 absolute backdrop-blur-sm top-[50%] left-[50%] "
        color="blue"
      />
    );
  if (products?.length === 0) {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    return <Empty />;
  }

  return (
    <div className="rounded-sm darkModeTop bg-gray-300 p-1">
      <Model>
        <Table>
          <Table.Header>
            {header.map((el, index) => (
              <td className="py-1 darkModeMiddle" key={index}>
                <Typography
                  variant="small"
                  className={`font-extrabold text-xl  ${
                    index === 7 ? "pr-2" : ""
                  }`}
                >
                  {el}
                </Typography>
              </td>
            ))}
          </Table.Header>
          <Table.Body>
            {products?.map((el, index) => (
              <CategoryRow
                item={el}
                key={el.name}
                borderKey={index === products?.length - 1}
              />
            ))}
          </Table.Body>
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        </Table>

        <Model.Window name={"productEdit"}>
          <ProductForm />
        </Model.Window>
      </Model>
    </div>
  );
}

export default ProductTable;
