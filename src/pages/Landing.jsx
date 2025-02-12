import React from "react";
import Hero from "../components/Hero";
import { customFetch } from "../utils";
import FeaturedProducts from "../components/FeaturedProducts";
import { useQuery } from "@tanstack/react-query";

const url = "/products?featured=true";

const featuredProductQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetch(url),
};

export const landingLoader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductQuery);
  console.log(response);
  const products = response.data.data;
  return { products };
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
