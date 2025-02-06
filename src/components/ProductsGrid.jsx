import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const ProductsGrid = () => {
  const { products } = useLoaderData();
  console.log(products);
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { title, price, description, image } = product.attributes;
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
          >
            <figure className="px-4 pt-4">
              <img
                src={image}
                alt={title}
                className="rounded-xl h-64 md:h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wider">{title}</h2>
              <span className="text-secondary">
                {Number(price / 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  // maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsGrid;

//    - For each `product`, destructure the attributes such as `title`, `price`, and `image`.
//    - Create a `Link` component that has the following:
//      - `key` attribute set to `product.id`.
//      - `to` attribute set to `/products/${product.id}`.
//      - `className` attribute with classes for styling.
//    - Inside the `Link`, create a `figure` element with the class `px-4 pt-4` to hold the product image.
//    - Within the `figure`, include an `img` element with the `src` attribute set to `image`, `alt` attribute set to `title`, and classes for styling.
//    - Below the `figure`, create a `div` element with the class `card-body items-center text-center`.
//    - Inside the `div`, display the `title` using a `h2` element with classes for styling.
//    - Display the `price` using a `span` element with the class `text-secondary`.

// 5. Export ProductsGrid Component:
//    - Export the `ProductsGrid` component as the default export of the module.
