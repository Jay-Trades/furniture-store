import React from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useLocation,
} from "react-router-dom";

const ComplexPageContainer = () => {
  const { meta } = useLoaderData();
  const { search, pathname } = useLocation();
  const totalPages = meta.pagination.pageCount;
  const curPage = meta.pagination.page;

  const navigate = useNavigate();
  //   const pagesArray = Array.from(
  //     { length: totalPages },
  //     (_, index) => index + 1
  //   );
  //   const addPageButton = ({ curPage, activeClass }) => {
  //     <button
  //       className="btn btn-xs sm:btn-md join-item"
  //       onClick={() => handlePageChange(page)}
  //       key={curPage}
  //     >
  //       {curPage}
  //     </button>;
  //   };

  const renderPages = () => {
    let pagesArray = [];

    if (totalPages > 5) {
      if (curPage > 2 && curPage < totalPages - 1) {
        pagesArray.push(1);
        pagesArray.push("...");
        pagesArray.push(curPage);
        pagesArray.push("...");
        pagesArray.push(totalPages);
      } else if (curPage <= 2) {
        pagesArray.push(1);
        pagesArray.push(2);
        pagesArray.push("...");
        pagesArray.push(totalPages);
      } else if (curPage >= totalPages - 1) {
        pagesArray.push(1);
        pagesArray.push("...");
        pagesArray.push(totalPages - 1);
        pagesArray.push(totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pagesArray.push(i);
      }
    }
    return pagesArray;
  };

  const pages = renderPages();

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
    const path = `${pathname}?${newQueryString.toString()}`;
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
        {pages.map((page) => {
          return (
            <button
              className={`btn btn-xs sm:btn-md join-item ${
                page === curPage ? "bg-blue-300 border-base-300" : ""
              }`}
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

export default ComplexPageContainer;
