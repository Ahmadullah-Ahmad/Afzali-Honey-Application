import { Card, Typography } from "@material-tailwind/react";
import { formatCurrency } from "../../utils/helpers";

export function DetailsCard({ title, value }) {
  return (
    <Card className="w-full sm:p-0 my-1 shadow-none py-3 mx-3 darkModeMiddle bg-gray-50 md:p-5  p-1">
      <Typography
        className="uppercase text-center  font-semibold darkModeMiddle text-gray-800"
        variant="paragraph"
      >
        {title} :{" "}
        <span className="font-light text-base">
          {typeof value === "number" &&
            title === "کرایه" &&
            formatCurrency(value)}
          {typeof value === "number" &&
            title === "صندق" &&
            formatCurrency(value)}
          {typeof value === "string" && title === "کارمند" && (
            <span className="text-lg">{value}</span>
          )}
          {typeof value === "string" && title === "تاریخ" && value}
        </span>
      </Typography>
    </Card>
  );
}
