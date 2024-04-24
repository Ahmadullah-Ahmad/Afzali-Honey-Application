import { IconButton, Typography } from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom";
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const PAGES_SIZE = 8;
export default function Pagination({ count, pageSize }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const PAGES = pageSize ? pageSize * 1 : PAGES_SIZE;
  const pageCount = Math.ceil(count / PAGES);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function previousPage() {
    const previous = currentPage === 1 ? 1 : currentPage - 1;
    searchParams.set("page", previous);
    setSearchParams(searchParams);
  }
  if (pageCount <= 1) return null;
  return (
    <td colSpan={10} className="py-2 dark:bg-transparent  ">
      <div className="darkModeBottom flex flex-row items-center justify-center gap-x-14 ">
        <IconButton
          size="sm"
          className="darkModeMiddle"
          variant="text"
          onClick={() => previousPage()}
          disabled={currentPage === 1}
        >
          <HiChevronLeft size={20} />
        </IconButton>
        <Typography>
          از <span className="font-medium"> {count}</span> نتایج{" "}
          <span className="font-medium">{(currentPage - 1) * PAGES + 1}</span>{" "}
          تا {"  "}
          <span className="font-medium">
            {currentPage === pageCount ? count : currentPage * PAGES}
          </span>{" "}
          را نشان میدهند
        </Typography>
        <IconButton
          size="sm"
          className="darkModeMiddle text-lg"
          variant="text"
          onClick={() => nextPage()}
          disabled={currentPage === pageCount}
        >
          <HiChevronRight size={20} />
        </IconButton>{" "}
      </div>
    </td>
  );
}
