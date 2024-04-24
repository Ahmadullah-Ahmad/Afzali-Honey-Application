import { Card, Typography } from "@material-tailwind/react";

export function StatisticsCard({ color, icon, title, value }) {
  return (
    <Card className="darkModeMiddle flex w-[15rem] flex-row flex-wrap justify-center gap-2 bg-gray-50 p-1 shadow-sm dark:text-white  md:w-full md:p-5  lg:justify-end">
      <div className="px-2">
        <Typography
          className="text-center text-2xl font-semibold uppercase text-gray-500"
          variant="paragraph"
        >
          {title}
        </Typography>
        <Typography className="font-[500]" dir="rtl">
          {value}
        </Typography>
      </div>
      <div
        className={
          ` flex  h-[3.2rem] w-[3.2rem] items-center justify-center rounded-md ` +
          color
        }
      >
        {icon}
      </div>
    </Card>
  );
}
