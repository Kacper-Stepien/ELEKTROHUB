import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const usePagination = (totalPages: number) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const navigate = useNavigate();

  const goToPage = (page: number) => {
    navigate(`?page=${page}`);
  };

  useEffect(() => {
    if (
      !page ||
      isNaN(parseInt(page)) ||
      parseInt(page) < 1 ||
      parseInt(page) > totalPages
    ) {
      navigate(`?page=1`);
    }
  }, [page, totalPages]);

  return { page, goToPage };
};

export default usePagination;
