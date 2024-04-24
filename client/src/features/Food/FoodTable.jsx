import { IconButton, Typography } from "@material-tailwind/react";
import Table from "../../UI/Table";
import FoodRow from "./FoodRow";
import Model from "../../UI/Model";
import FoodForm from "./FoodForm";

import Empty from "../../UI/Empty";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
const FoodHeader = ["نام", "مقدار", "قیمت", "مجموعه", "تاریخ", ""].reverse();

function FoodTable({ Food, keepId }) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const pagesCount = Math.ceil(Food?.length / 4);

  function nextPage() {
    setCurrentPage((el) => el + 1);
    setStart(end);
    setEnd((el) => el + 4);
  }
  function previous() {
    setCurrentPage((el) => el - 1);

    setStart((el) => el - 4);
    setEnd((el) => el - 4);
  }
  if (Food.length === 0 && keepId) return <Empty data={"غذا"} />;
  const food = Food?.slice(
    start > 0 ? start : 0,
    end > Food.length ? Food.length : end
  );
  return (
    <div className=" w-full">
      <Model>
        <Typography className="text-center font-semibold text-lg uppercase">
          غذا دادن به زنبور
        </Typography>
        <Table>
          <Table.Header>
            {FoodHeader.map((el, index) => (
              <td className="py-2 darkModeMiddle" key={index}>
                <Typography
                  variant="small"
                  className={`font-semibold text-lg uppercase ${
                    index === 5 ? "pr-2" : ""
                  }`}
                >
                  {el}
                </Typography>
              </td>
            ))}
          </Table.Header>
          <Table.Body>
            {food?.map((el, index) => (
              <FoodRow
                item={el}
                key={el.id}
                keepId={keepId}
                borderKey={index === Food.length - 1}
              />
            ))}
          </Table.Body>
          {Food?.length > 4 ? (
            <Table.Footer>
              <td colSpan={8}>
                <div className="flex flex-row darkModeBottom items-center gap-x-14 justify-center ">
                  <IconButton
                    size="sm"
                    className="darkModeMiddle flex flex-row"
                    variant="text"
                    onClick={previous}
                    disabled={end === 4}
                  >
                    <HiChevronLeft size={20} />
                  </IconButton>
                  <Typography>
                    Page {currentPage} of {pagesCount}
                  </Typography>
                  <IconButton
                    size="sm"
                    className="darkModeMiddle text-lg"
                    variant="text"
                    onClick={nextPage}
                    disabled={food?.at(-1) === Food?.at(-1)}
                  >
                    <HiChevronRight size={20} />
                  </IconButton>{" "}
                </div>
              </td>
            </Table.Footer>
          ) : null}
        </Table>
        <Model.Window name={"editFood"}>
          <FoodForm keepId={keepId} />
        </Model.Window>
      </Model>
    </div>
  );
}

export default FoodTable;
