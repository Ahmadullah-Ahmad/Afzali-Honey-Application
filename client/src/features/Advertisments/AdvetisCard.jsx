import { Card, Typography } from "@material-tailwind/react";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { URL } from "../../utils/constant";
import { NavLink } from "react-router-dom";
function AdvetisCard({ item }) {
  console.log(URL + item.photo);
  return (
    <Card
      color="transparent"
      className="darkModeMiddle flex items-center justify-center bg-gray-100  p-4 shadow-none"
      role="listitem"
    >
      <div className="flex justify-center">
        <img
          src={`${URL + item.photo}`}
          alt="product"
          width={180}
          className="w-full rounded-lg object-cover object-center sm:h-32"
        />
      </div>
      <div className="darkModeMiddle  container flex  justify-end" role="table">
        <div className="text-right ">
          <Typography className=" gap-4   font-semibold">
            نام : <span className=" font-normal ">{item?.name}</span>
          </Typography>
          <Typography className="  gap-4  font-semibold">
            قیمت :{" "}
            <span className=" font-normal">{item?.salePrice} افغانی</span>
          </Typography>
        </div>
        <NavLink
          to={`/home/${item.id}`}
          size="sm"
          variant="text"
          className="  absolute  bottom-1 left-1 rounded-md px-2 py-[1px] transition-all duration-100 hover:bg-blue-700 hover:text-gray-50"
        >
          <HiOutlineArrowLeft size={20} width={50} />
        </NavLink>
      </div>
    </Card>
  );
}

export default AdvetisCard;
