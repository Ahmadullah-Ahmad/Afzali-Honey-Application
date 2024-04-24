import { Card, Button, Spinner } from "@material-tailwind/react";
import SortBy from "../UI/SortBy";
import NavBarMenu from "../UI/NavBarMenu";
import ProductTable from "../features/Product/ProductTable";
import Model from "../UI/Model";
import CategoryForm from "../features/Product/ProductForm";
import { useProducts } from "../features/Product/useGetProducts";
import Empty from "../UI/Empty";
import { HiArrowLeft } from "react-icons/hi2";
import { Back } from "../hooks/Back";
import { useDashboardData } from "../features/Dashboard/useGetDashboard";
function Product() {
  const { products, isLoading } = useProducts();
  const { data, isLoading: productLoading } = useDashboardData();

  // Menu label
  let chartLabel = ["همه"];
  data?.product?.filter((el) => {
    if (!chartLabel.includes(el.type.toUpperCase())) {
      return chartLabel.push(el.type.toUpperCase());
    }
    return el;
  });
  const { goBack } = Back();
  if (isLoading || productLoading)
    return (
      <Spinner
        className="h-16 w-16 fixed  top-[50%] left-[50%] "
        color="blue"
      />
    );
  if (products?.length === 0)
    return (
      <>
        <div className="float-left bottom-5">
          <HiArrowLeft
            size={30}
            onClick={() => goBack()}
            className="cursor-pointer  hover:text-blue-600"
          />
        </div>
        <div className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          <Empty data={"تولیدات"} />
          <div className="px-2 flex justify-center mt-4">
            <Model>
              <Model.Open open={"purchaseForm"}>
                <Button
                  variant="filled"
                  color="white"
                  className="bg-gray-400 buttonText text-gray-900"
                >
                  اضافه کردن تولید
                </Button>
              </Model.Open>

              <Model.Window name={"purchaseForm"}>
                <CategoryForm />
              </Model.Window>
            </Model>
          </div>
        </div>
      </>
    );
  return (
    <Card className="grid h-full grid-rows-[auto_1fr] darkModeTop rounded-sm bg-gray-300 shadow-none p-1">
      <div className="flex flex-row items-center px-3 rounded-none p-1 darkModeTop bg-gray-300  ">
        <div className="flex justify-center gap-x-3 w-72">
          <SortBy
            routes={[
              { value: "", label: "ترتیب" },
              { value: "quantity-asc", label: "مقدار(صعودي‌)" },
              { value: "quantity-desc", label: "مقدار(نزولی)" },
              { value: "price-asc", label: "قیمت(صعودي‌)" },
              { value: "price-desc", label: "قیمت(نزولی)" },
            ]}
          />
          <NavBarMenu routes={chartLabel} />
        </div>
      </div>

      <div>
        <ProductTable />
        <div className="px-2">
          <Model>
            <Model.Open open={"purchaseForm"}>
              <Button
                variant="filled"
                color="white"
                className="bg-gray-500 darkModeSubimt text-black buttonText"
              >
                اضافه کردن تولید
              </Button>
            </Model.Open>

            <Model.Window name={"purchaseForm"}>
              <CategoryForm />
            </Model.Window>
          </Model>
        </div>
      </div>
    </Card>
  );
}

export default Product;
