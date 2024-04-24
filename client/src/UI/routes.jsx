import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineBuildingStorefront,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineSquares2X2,
  HiOutlineWallet,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiOutlineArrowRight,
  HiOutlineBookOpen,
  HiOutlineRectangleStack,
} from "react-icons/hi2";
const route = [
  {
    path: "صفحه عمومی",
    url: "dashboard/home",
    icon: <HiOutlineSquares2X2 size={20} />,
  },
  {
    path: "تولیدات",
    url: "dashboard/product",
    icon: <HiOutlineRectangleStack size={20} />,
  },
  {
    path: "فروشات",
    url: "dashboard/sales",
    icon: <HiOutlineShoppingBag size={20} />,
  },
  {
    path: "خریداری",
    url: "dashboard/get",
    icon: <HiOutlineShoppingCart size={20} />,
  },
  {
    path: "خدمات",
    url: "dashboard/service",
    icon: <HiOutlineAdjustmentsHorizontal size={20} />,
  },

  {
    path: "مصارف",
    url: "dashboard/spend",
    icon: <HiOutlineWallet size={20} />,
  },
  {
    path: "مشتری",
    url: "dashboard/customer",
    icon: <HiOutlineUserGroup size={20} />,
  },
  {
    path: "کارمندان",
    url: "dashboard/user",
    icon: <HiOutlineUserCircle size={20} />,
  },

  {
    path: "نمایندگی",
    url: "dashboard/branch",
    icon: <HiOutlineBuildingStorefront size={20} />,
  },
  {
    path: "ریپورت",
    url: "dashboard/report",
    icon: <HiOutlineBookOpen size={20} />,
  },
];

const SalesRoutes = [
  {
    path: "Sale honey",
    url: "dashboard/sales/honey",
    photo: <HiOutlineShoppingBag size={60} />,
    icon: <HiOutlineArrowRight size={30} />,
  },
  {
    path: "Sale honey",
    url: "dashboard/sales/honey",
    photo: <HiOutlineShoppingBag size={60} />,
    icon: <HiOutlineArrowRight size={30} />,
  },
];

export { route, SalesRoutes };
