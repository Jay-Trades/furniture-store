import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { ProductList, FormSelect } from "./";
import ProductsGrid from "./ProductsGrid";
import { BsFillGridFill, BsList } from "react-icons/bs";

const setActiveStyles = (view, gridView) => {
  if (view === "grid" && gridView) {
    return " text-xl btn btn-circle btn-sm bg-primary text-primary-content";
  } else if (view === "list" && !gridView) {
    return "text-xl btn btn-circle btn-sm bg-primary text-primary-content";
  } else {
    return "text-xl btn btn-circle btn-sm btn-ghost text-based-content";
  }
  // } else if (view === "grid" && !gridView) {
  //   return "text-xl btn btn-circle btn-sm btn-ghost";
  // } else if (view === "list" && gridView) {
  //   return "text-xl btn btn-circle btn-sm btn-ghost";
};

const ProductsContainer = () => {
  const { products, meta } = useLoaderData();
  console.log(meta);
  const totalCount = meta.pagination.total;

  const [gridView, setGridView] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {totalCount} product{totalCount > 1 && "s"}
        </h4>
        <div className="flex gap-x-2">
          <button
            type="button"
            className={setActiveStyles("grid", gridView)}
            onClick={() => setGridView(true)}
          >
            <BsFillGridFill />
          </button>
          <button
            type="button"
            className={setActiveStyles("list", gridView)}
            onClick={() => setGridView(false)}
          >
            <BsList />
          </button>
        </div>
      </div>
      {gridView ? <ProductsGrid /> : <ProductList />}
    </div>
  );
};

export default ProductsContainer;
