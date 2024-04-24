import { IconButton, Typography } from "@material-tailwind/react";
import Table from "../../UI/Table";
import ExtractRow from "./ExtractRow";
import Model from "../../UI/Model";
import HoneyForm from "./HoneyForm";
import Empty from "../../UI/Empty";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
const HoneyHeader = ["نوع عسل", "مقدار", "تاریخ", ""].reverse();

function HoneyTable({ Extract, keepId }) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const pagesCount = Math.ceil(Extract?.length / 4);

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
  if (Extract.length === 0 && keepId) return <Empty data={"عسل"} />;

  const honey = Extract?.slice(
    start > 0 ? start : 0,
    end > Extract.length ? Extract.length : end
  );

  return (
    <div className=" w-full ">
      <Model>
        <Typography className="text-center font-semibold uppercase">
          کشیدن عسل
        </Typography>
        <Table>
          <Table.Header>
            {HoneyHeader.map((el, index) => (
              <td className="py-3 darkModeMiddle" key={index}>
                <Typography
                  variant="small"
                  className={`font-semibold uppercase ${
                    index === 3 ? "pr-2" : ""
                  }`}
                >
                  {el}
                </Typography>
              </td>
            ))}
          </Table.Header>
          <Table.Body>
            {honey?.map((el, index) => (
              <ExtractRow
                item={el}
                key={el.id}
                borderKey={index === Extract?.length - 1}
              />
            ))}
          </Table.Body>
          {Extract?.length > 4 ? (
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
                    disabled={honey?.at(-1) === Extract?.at(-1)}
                  >
                    <HiChevronRight size={20} />
                  </IconButton>{" "}
                </div>
              </td>
            </Table.Footer>
          ) : null}
        </Table>

        <Model.Window name={"editExract"}>
          <HoneyForm keepId={keepId} />
        </Model.Window>
      </Model>
    </div>
  );
}

export default HoneyTable;
