import React from "react";
import Hero from "../components/Hero";
import { customFetch } from "../utils";
import FeaturedProducts from "../components/FeaturedProducts";

const url = "/products?featured=true";
export const landingLoader = async () => {
  const response = await customFetch(url);
  // console.log(response.data.data);
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
