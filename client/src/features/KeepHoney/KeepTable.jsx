import { Spinner, Typography } from "@material-tailwind/react";
import Table from "../../UI/Table";
import KeepRow from "./KeepRow";
import KeepForm from "./KeepForm";
import { useKeeps } from "./useGetKeeps";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../UI/Pagination";
import Model from "../../UI/Model";

const KeepHeader = [
  "کارمند",
  "صندوق",
  "غذا",
  "ادرس",
  "عسل",
  "کرایه",
  "تاریخ",
  "مجموعه",
  "",
].reverse();
function KeepTable() {
  const { count, isLoading, keeps } = useKeeps();

  const [searchParams, setSearchParams] = useSearchParams();
  if (keeps?.length === 0) {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }
  if (isLoading)
    return (
      <Spinner
        className="h-16 w-16 absolute backdrop-blur-sm top-[50%] left-[50%] "
        color="blue"
      />
    );

  return (
    <div className="rounded-sm p-1">
      <Model>
        <Table>
          <Table.Header>
            {KeepHeader.map((el, index) => (
              <td className="py-3 darkModeMiddle" key={index}>
                <Typography
                  variant="small"
                  className={`font-semibold uppercase text-lg ${
                    index === 8 ? "pr-2" : ""
                  }`}
                >
                  {el}
                </Typography>
              </td>
            ))}
          </Table.Header>
          <Table.Body>
            {keeps?.map((el, index) => (
              <KeepRow
                item={el}
                key={el.id}
                borderKey={index === keeps?.length - 1}
              />
            ))}
          </Table.Body>
          <Table.Footer>
            <Pagination count={count} pageSize={7} />
          </Table.Footer>
        </Table>
        <Model.Window name={"EditKeep"}>
          <KeepForm />
        </Model.Window>
      </Model>
    </div>
  );
}

export default KeepTable;
