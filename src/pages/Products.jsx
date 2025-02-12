import React from "react";
import { Filters, ProductsContainer, PaginationContainer } from "../components";
import { customFetch } from "../utils";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const productsLoader =
  (queryClient) =>
  async ({ request }) => {
    // const params = Object.fromEntries([
    //   ...new URL(request.url).searchParams.entries(),
    // ]);

    const url = new URL(request.url);

    const searchParams = url.searchParams;
    // console.log(searchParams.getAll("search"), url);
    // console.log(searchParams.toString());
    // const shipping = searchParams.get("shipping") === "on" ? true : false;
    // console.log(shipping);
    const params = {
      search: searchParams.get("search"),
      category: searchParams.get("category"),
      company: searchParams.get("company"),
      order: searchParams.get("order"),
      price: searchParams.get("price"),
      shipping: searchParams.get("shipping"),
      page: searchParams.get("page"),
    };

    // debugger;

    // console.log(params);
    const finalUrl = new URL("/api/products", customFetch.defaults.baseURL);
    Object.keys(params).forEach((key) =>
      finalUrl.searchParams.append(key, params[key])
    );
    console.log(finalUrl.toString());

    const response = await queryClient.ensureQueryData({
      queryKey: ["products", params],
      queryFn: () =>
        customFetch.get(`/products`, {
          params,
        }),
    });
    console.log(response);
    const products = response.data.data;
    const meta = response.data.meta;
    // console.log(products);
    return { products, meta, params };
  };

const Products = () => {
  const { product } = useLoaderData();
  console.log(product);
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
