import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const usePagination = (totalPages: number) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const navigate = useNavigate();

  const goToPage = (page: number) => {
    if (page < 1) {
      navigate(`?page=1`);
    } else if (page > totalPages) {
      navigate(`?page=${totalPages}`);
    } else {
      navigate(`?page=${page}`);
    }
  };

  useEffect(() => {
    if (!page || isNaN(parseInt(page)) || parseInt(page) < 1) {
      navigate(`?page=1`);
    } else if (parseInt(page) > totalPages) {
      navigate(`?page=${totalPages}`);
    }
  }, [page, totalPages]);

  return { page, goToPage };
};

export default usePagination;
