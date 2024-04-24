import { Card, Spinner, Typography } from "@material-tailwind/react";
import { useProductOne } from "./useGetOne";
import { URL } from "../../utils/constant";
import { formatCurrency } from "../../utils/helpers";

function Advertisment() {
  const { product, isLoading } = useProductOne();

  if (isLoading)
    return (
      <Spinner
        className="absolute left-[50%] top-[50%] h-16 w-16 backdrop-blur-sm "
        color="blue"
      />
    );

  return (
    <Card className="darkModeTop relative  mt-5  h-[90%] w-[80%] bg-transparent   shadow-none sm:gap-10">
      <Card className="darkModeMiddle  relative flex h-full flex-col rounded-md bg-gray-200 pt-6 text-right shadow-sm md:grid md:grid-cols-[1fr_1fr]">
        <div className="flex justify-center px-4">
          <img
            className="h-32 w-64 rounded-md object-cover  object-center md:h-72 md:w-full "
            src={`${URL + product?.photo}`}
            alt="product"
          />
        </div>
        <div className=" pr-6 text-right ">
          <div>
            <Typography className="font-semibold md:py-2 md:text-xl">
              نام : <span className="ml-4 font-normal">{product?.name}</span>
            </Typography>
            <Typography className="font-semibold md:py-2 md:text-xl">
              قیمت :{" "}
              <span className="ml-4 font-normal">
                {formatCurrency(product?.salePrice)}
              </span>
            </Typography>
            <Typography className="font-semibold md:py-2 md:text-xl">
              جزئیات
              <br />
              <span className=" textWrap bg-clip-text font-normal">
                {product?.description}
              </span>
            </Typography>
          </div>
        </div>
      </Card>
    </Card>
  );
}

export default Advertisment;
