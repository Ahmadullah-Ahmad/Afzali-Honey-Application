import { Spinner } from "@material-tailwind/react";
import AdvetisCard from "./AdvetisCard";
import { useAllProducts } from "./useGetAdvertisments";
import Empty from "../../UI/Empty";
import PagePagination from "../../UI/PagePagination";
function Advertise() {
  const { isLoading, products, count } = useAllProducts();

  if (isLoading)
    return (
      <Spinner
        className="h-16 w-16 absolute backdrop-blur-sm top-[50%] left-[50%] "
        color="blue"
      />
    );
  return (
    <>
      {products?.length !== 0 ? (
        <>
          <div
            className="container mb-3 bg-gray-300 grid mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4 sm:w-[100%] gap-y-10 w-[70%] darkModeTop"
            role="list"
          >
            {products?.map((el) => (
              <AdvetisCard key={el?.id} item={el} />
            ))}
          </div>
          <PagePagination count={count} pageSize={10} />
        </>
      ) : (
        <Empty data={"تولیدات"} />
      )}
    </>
  );
}

export default Advertise;
