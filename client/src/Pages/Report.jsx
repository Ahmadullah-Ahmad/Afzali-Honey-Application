import { Card } from "@material-tailwind/react";

import ReportTable from "../features/Report/ReportTable";
import ReportSearch from "../features/Report/ReportSearch";

function Report() {
  return (
    <Card className="grid h-full grid-rows-[auto_1fr] darkModeTop p-1 rounded-sm bg-gray-300 shadow-none ">
      <div>
        <ReportSearch />
      </div>

      <ReportTable />
    </Card>
  );
}

export default Report;
