import { Card } from "@material-tailwind/react";
import DashboardLayout from "../features/Dashboard/DashboardLayout";
import Filter from "../UI/Filter";

function Dashboard() {
  return (
    <Card className="darkModeTop grid h-full grid-rows-[auto_1fr]  rounded-sm bg-gray-300">
      <div className="flex  items-center justify-between rounded-sm p-1">
        <Filter
          filterField={"last"}
          options={[
            { value: 7, label: "هفت روز" },
            { value: 30, label: "سی روز" },
            { value: 90, label: "نود روز" },
          ]}
        />
      </div>
      <DashboardLayout />
    </Card>
  );
}

export default Dashboard;
