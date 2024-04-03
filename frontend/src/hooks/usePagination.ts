import { useState, useEffect } from "react";

import { PRODUCTS_PER_PAGE } from "../../constants";
import { useNavigate, useSearchParams } from "react-router-dom";

const usePagination = (total: number = PRODUCTS_PER_PAGE) => {
  const [params] = useSearchParams();
  const getPageFromParams = () => {
    const pageParam = params.get("page");
    if (!Number.isInteger(Number(pageParam))) {
      return 1;
    }
    const page =
      pageParam !== null && !Number.isNaN(pageParam) ? Number(pageParam) : 1;
    console.log(page);
    return page;
  };

  const [currentPage, setCurrentPage] = useState(getPageFromParams());
  const [totalPages, setTotalPages] = useState(total);
  const navigate = useNavigate();

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (currentPage < 1) {
      setCurrentPage(1);
      navigate(`?page=1`);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
      navigate(`?page=${totalPages}`);
    } else if (params.get("page") !== currentPage.toString()) {
      navigate(`?page=${currentPage}`);
    }
  }, [currentPage]);

  return {
    currentPage,
    nextPage,
    prevPage,
    goToPage,
    totalPages,
    setTotalPages,
  };
};

export default usePagination;
