import { Button, Card, Typography } from "@material-tailwind/react";
import { HiArrowLeft } from "react-icons/hi2";
import { Back } from "../hooks/Back";

function PageNotFound() {
  const { goBack } = Back();
  return (
    <Card className="flex min-h-screen items-center  justify-center bg-gray-100">
      <div className="fixed top-8 left-5 ">
        <HiArrowLeft
          size={30}
          onClick={() => goBack()}
          className="cursor-pointer text-orange-500  hover:text-blue-600"
        />
      </div>
      <div className="bg-inherit text-center">
        <Typography className="text-lg font-semibold uppercase text-red-400">
          page not found 404 Error
        </Typography>
        <Button
          variant="filled"
          className="bg-orange-500 text-gray-200 hover:bg-blue-600"
          onClick={() => goBack()}
        >
          Try Again
        </Button>
      </div>
    </Card>
  );
}

export default PageNotFound;
