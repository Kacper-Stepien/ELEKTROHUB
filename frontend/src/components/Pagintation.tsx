import { FC } from "react";
import { NavLink } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

interface PaginationProps {
  page: number;
  total: number;
  goToPage: (page: number) => void;
  maxNumberOfVisibleButtons?: number;
}

const Pagination: FC<PaginationProps> = ({
  page,
  total,
  goToPage,
  maxNumberOfVisibleButtons = 11,
}) => {
  const pageButtons: JSX.Element[] = [];

  const sideButtons = Math.floor(maxNumberOfVisibleButtons / 2);

  const activePageClass = "bg-blue-600 text-white";
  const elementClass =
    "flex w-8 h-8 items-center justify-center rounded-md hover:border-2 border-blue-600 transition duration-300 ease-in-out cursor-pointer";

  const renderPageButtons = () => {
    const start = Math.max(
      1,
      Math.min(page - sideButtons, total - maxNumberOfVisibleButtons + 1),
    );
    const end = Math.min(start + maxNumberOfVisibleButtons - 1, total);

    if (start > 1) {
      pageButtons.push(
        <li key="first">
          <NavLink
            to={`?page=${1}`}
            className={`${elementClass} ${page === 1 ? activePageClass : ""}`}
            onClick={() => {
              console.log("goToPage(1)");
            }}
          >
            1
          </NavLink>
        </li>,
      );
      if (start > 2) {
        pageButtons.push(
          <li key="dots1" className="cursor-default">
            ...
          </li>,
        );
      }
    }

    for (let i = start; i <= end; i++) {
      pageButtons.push(
        <li key={i}>
          <NavLink
            to={`?page=${i}`}
            className={`${elementClass} ${i === page ? activePageClass : ""}`}
            onClick={() => goToPage(i)}
          >
            {i}
          </NavLink>
        </li>,
      );
    }

    if (end < total) {
      if (end < total - 1) {
        pageButtons.push(
          <li key="dots2" className="cursor-default">
            ...
          </li>,
        );
      }
      pageButtons.push(
        <li key="last">
          <NavLink
            to={`?page=${total}`}
            className={`${elementClass} ${total === page ? activePageClass : ""}`}
            onClick={() => goToPage(total)}
          >
            {total}
          </NavLink>
        </li>,
      );
    }
  };

  renderPageButtons();

  return (
    <ul className="flex items-center justify-center gap-3">
      <li>
        <NavLink
          to={`?page=${page - 1}`}
          className={`${page === 1 ? "invisible" : ""} ${elementClass} ${activePageClass}`}
          onClick={() => goToPage(page - 1)}
        >
          <FaAngleLeft />
        </NavLink>
      </li>
      {pageButtons}
      <li>
        <NavLink
          to={`?page=${page + 1}`}
          className={`${page === total ? "invisible" : ""} ${elementClass} ${activePageClass}`}
          onClick={() => goToPage(page + 1)}
        >
          <FaAngleRight />
        </NavLink>
      </li>
    </ul>
  );
};

export default Pagination;
