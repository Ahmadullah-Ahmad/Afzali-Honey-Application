import { Card } from "@material-tailwind/react";
import Advertise from "../features/Advertisments/Advertise";

function Home() {
  return (
    <Card className="rounded-none  darkModeTop shadow-none min-h-[calc(100dvh-11.5dvh)] mx-auto flex justify-center items-center bg-gray-300 pt-3">
      <Advertise />
    </Card>
  );
}

export default Home;
