import { HiOutlineArrowRight } from "react-icons/hi2";
import Advertisment from "../features/Advertisments/Advertisment";
import { Back } from "../hooks/Back";

function AdvertismentDetails() {
  const { goBack } = Back();
  return (
    <div className="darkModeTop relative  flex h-[88dvh] w-full justify-center bg-gray-300">
      <HiOutlineArrowRight
        onClick={goBack}
        className="absolute right-3 top-2 z-[9999] cursor-pointer hover:text-blue-500 md:right-6"
        size={30}
      />
      <Advertisment />
    </div>
  );
}

export default AdvertismentDetails;
