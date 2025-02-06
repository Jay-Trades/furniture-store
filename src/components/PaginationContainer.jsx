import React from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useLocation,
} from "react-router-dom";

const PaginationContainer = () => {
  const { products, meta } = useLoaderData();
  const { search, pathname } = useLocation();
  const totalPages = meta.pagination.pageCount;
  const curPage = meta.pagination.page;
  const navigate = useNavigate();
  const pagesArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePageChange = (page) => {
    if (page < 1) {
      return;
    }

    if (page > totalPages) {
      return;
    }
    console.log(page);
    console.log(search); //gives us the search params in the request url that is active (could be NONE if its default)
    console.log(pathname); //what path/route we are on (/products)
    const newQueryString = new URLSearchParams(search);
    newQueryString.set("page", page);
    const path = `${pathname}?${newQueryString.toString(curPage)}`;
    console.log(path);
    navigate(path);
  };
  if (totalPages < 2) return null;
  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => handlePageChange(curPage - 1)}
        >
          PREV
        </button>
        {pagesArray.map((page) => {
          return (
            <button
              className="btn btn-xs sm:btn-md join-item"
              onClick={() => handlePageChange(page)}
              key={page}
            >
              {page}
            </button>
          );
        })}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => handlePageChange(curPage + 1)}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
