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

  const activePageClass = "bg-blue-600";
  const elementClass = "flex w-6 items-center justify-center rounded-md";

  const renderPageButtons = () => {
    const start = Math.max(
      1,
      Math.min(page - sideButtons, total - maxNumberOfVisibleButtons + 1),
    );
    const end = Math.min(start + maxNumberOfVisibleButtons - 1, total);

    if (start > 1) {
      pageButtons.push(
        <li
          key="first"
          className={`${elementClass} ${page === 1 ? activePageClass : ""}`}
        >
          <NavLink to={`?page=${1}`} onClick={() => goToPage(1)}>
            1
          </NavLink>
        </li>,
      );
      if (start > 2) {
        pageButtons.push(<li key="dots1">...</li>);
      }
    }

    for (let i = start; i <= end; i++) {
      pageButtons.push(
        <li
          key={i}
          className={`${elementClass} ${i === page ? activePageClass : ""}`}
        >
          <NavLink to={`?page=${i}`} onClick={() => goToPage(i)}>
            {i}
          </NavLink>
        </li>,
      );
    }

    if (end < total) {
      if (end < total - 1) {
        pageButtons.push(<li key="dots2">...</li>);
      }
      pageButtons.push(
        <li
          key="last"
          className={`${elementClass} ${total === page ? activePageClass : ""}`}
        >
          <NavLink to={`?page=${total}`} onClick={() => goToPage(total)}>
            {total}
          </NavLink>
        </li>,
      );
    }
  };

  renderPageButtons();

  return (
    <ul className="flex items-center justify-center gap-4">
      <li className={`${page === 1 ? "invisible" : ""}`}>
        <NavLink to={`?page=${page - 1}`} onClick={() => goToPage(page - 1)}>
          <FaAngleLeft />
        </NavLink>
      </li>
      {pageButtons}
      <li className={`${page === total ? "invisible" : ""}`}>
        <NavLink to={`?page=${page + 1}`} onClick={() => goToPage(page + 1)}>
          <FaAngleRight />
        </NavLink>
      </li>
    </ul>
  );
};

export default Pagination;
