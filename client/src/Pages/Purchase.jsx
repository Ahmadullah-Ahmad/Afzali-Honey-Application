import { Button, Card, Spinner } from "@material-tailwind/react";
import PurchaseTable from "../features/Purchase/purchaseTable";
import NavBarMenu from "../UI/NavBarMenu";
import SortBy from "../UI/SortBy";
import Model from "../UI/Model";
import Empty from "../UI/Empty";
import { Back } from "../hooks/Back";
import PurchaseForm from "../features/Purchase/PurchaseForm";
import { usePurchase } from "../features/Purchase/useGetPurchase";
import { HiArrowLeft } from "react-icons/hi2";

function Purchase() {
  const { purchases, isLoading } = usePurchase();

  let purchaseCategories = ["همه"];
  purchases?.filter((el) => {
    if (!purchaseCategories.includes(el.product.type.toUpperCase())) {
      return purchaseCategories.push(el.product.type.toUpperCase());
    }
    return el;
  });
  const { goBack } = Back();
  if (isLoading)
    return (
      <Spinner
        className="h-16 w-16 fixed  top-[50%] left-[50%] "
        color="blue"
      />
    );
  if (purchases?.length === 0)
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
          <Empty data={"خریداری"} />
          <div className="px-2 flex justify-center mt-4">
            <Model>
              <Model.Open open={"purchaseForm"}>
                <Button
                  variant="filled"
                  color="white"
                  className="bg-gray-400 text-gray-900 darkModeSubimt buttonText"
                >
                  خریداری جدید
                </Button>
              </Model.Open>

              <Model.Window name={"purchaseForm"}>
                <PurchaseForm />
              </Model.Window>
            </Model>
          </div>
        </div>
      </>
    );
  return (
    <Card className="h-full rounded-sm shadow-none darkModeTop bg-gray-300 p-1">
      <div className="flex items-center  darkModeTop bg-gray-300 p-1">
        <SortBy
          routes={[
            { value: "", label: "ترتیب" },
            { value: "quantity-asc", label: "مقدار(صعودي‌)" },
            { value: "quantity-desc", label: "مقدار(نزولی)" },
            { value: "price-asc", label: "قیمت(صعودي‌)" },
            { value: "price-desc", label: "قیمت(نزولی)" },
          ]}
        />
        <div className="pl-5">
          <NavBarMenu routes={purchaseCategories} />
        </div>
      </div>
      <PurchaseTable title={"Purchase Things"} />
      <div className="px-1">
        <Model>
          <Model.Open open={"purchaseForm"}>
            <Button
              variant="filled"
              color="white"
              className="bg-gray-400 darkModeSubimt buttonText text-gray-900"
            >
              خریداری جدید
            </Button>
          </Model.Open>

          <Model.Window name={"purchaseForm"}>
            <PurchaseForm />
          </Model.Window>
        </Model>
      </div>
    </Card>
  );
}

export default Purchase;
