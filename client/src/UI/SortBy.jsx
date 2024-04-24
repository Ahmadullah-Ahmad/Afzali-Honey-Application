import {
  Card,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { HiChevronDown } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

function SortBy({ routes }) {
  const [searchParmas, setSearchParams] = useSearchParams();

  const currentField = searchParmas.get("sort") || null;

  function handleClick(value) {
    if (!value) {
      searchParmas.delete("sort");
      setSearchParams(searchParmas);
    } else {
      searchParmas.set("sort", value);
      if (searchParmas.get("page")) searchParmas.set("page", 1);
      setSearchParams(searchParmas);
    }
  }
  function ReturnDari(value) {
    const matchValue = [
      { value: "", label: "ترتیب" },
      { value: "quantity-asc", label: "مقدار(صعودي‌)" },
      { value: "quantity-desc", label: "مقدار(نزولی)" },
      { value: "price-asc", label: "قیمت(صعودي‌)" },
      { value: "price-desc", label: "قیمت(نزولی)" },
      { value: "amount-asc", label: "مقدار(صعودي‌)" },
      { value: "amount-desc", label: "مقدار(نزولی)" },
    ].filter((el) => el.value === value);
    return matchValue.at(0).label;
  }
  return (
    <div className="w-48">
      <Menu placement="bottom">
        <MenuHandler>
          <Card className="flex cursor-pointer flex-row items-center justify-between rounded-md darkModeMiddle bg-gray-200 py-1 px-2 shadow-sm">
            <Typography className="text-sm uppercase text-center md:text-xl">
              {currentField
                ? currentField === "salePrice"
                  ? "price"
                  : ReturnDari(currentField)
                : "ترتیب"}
            </Typography>

            <HiChevronDown size={30} className="px-1" />
          </Card>
        </MenuHandler>
        <MenuList className="darkModeTop">
          {routes.map((el) => (
            <MenuItem key={el.value} onClick={() => handleClick(el.value)}>
              <Typography className="uppercase md:text-xl">
                {" "}
                {el.label}
              </Typography>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}
export default SortBy;
