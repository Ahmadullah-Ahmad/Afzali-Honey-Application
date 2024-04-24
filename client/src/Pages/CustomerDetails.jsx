import { Card } from "@material-tailwind/react";
import CustomerInfo from "../features/Customer/CustomerDetails";

function CustomerDetails() {
  return (
    <Card className=" rounded-sm h-full darkModeTop bg-gray-200 p-2 shadow-none ">
      <CustomerInfo />
    </Card>
  );
}

export default CustomerDetails;
