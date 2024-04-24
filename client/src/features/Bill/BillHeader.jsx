import { Typography } from "@material-tailwind/react";

function BillHeader({ location, phone }) {
  return (
    <div className="flex flex-row justify-between px-12  items-center ">
      <img src="/image/Steam.png" alt="logo" width={80} />

      <div className="flex flex-col text-right text-lg relative">
        <Typography className="font-medium text-lg text-justif  bg-gray-500/70 dark:bg-transparent px-2 rounded-tl-md rounded-tr-md">
          پراسس کردن و پروش کردن عسل خالص افغانی
        </Typography>
        <Typography className="bg-gray-400/70 px-2 dark:bg-transparent">
          <span className="font-semibold pl-2 ">ادرس :</span>
          {location}
        </Typography>
        <Typography className="bg-gray-300/70 px-2 rounded-bl-md rounded-br-md dark:bg-transparent ">
          <span className="font-semibold pl-2">شماره :</span>
          {phone}
        </Typography>

        <Typography className=" bg-orange-700/20 rounded-full p-2 absolute top-4 -left-10 text-xs">
          عمده
        </Typography>
        <Typography className=" bg-orange-700/20 rounded-full text-xs absolute top-4 -right-12  p-2 ">
          پرچون
        </Typography>
      </div>
      <img src="/image/Steam.png" alt="logo" width={80} />
    </div>
  );
}

export default BillHeader;
