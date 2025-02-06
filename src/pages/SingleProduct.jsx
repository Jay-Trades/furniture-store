import { Link, useLoaderData } from "react-router-dom";
import { customFetch, formatPrice } from "../utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cart/cartSlice";
import { toast } from "react-toastify";

// params is passed through by React Router automatically and contains the URL parameters
export const singleLoader = async ({ params }) => {
  const response = await customFetch.get(`/products/${params.id}`);
  // console.log(response);
  // console.log(params);
  const product = response.data.data;
  return { product };
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { title, price, description, image, colors, company } =
    product.attributes;
  const [color, setColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  // console.log(quantity);

  const dispatch = useDispatch();

  //add to bag function to update cart state through reducer action. Imported from cartSlice.
  const addToBag = () => {
    // const uniqueId = `${product.id}-${color}`; // Combine product.id and color
    dispatch(
      addItem({
        id: product.id,
        cartId: product.id + color,
        title,
        price,
        quantity,
        company,
        image,
      })
    );
  };

  return (
    <section>
      <div className="breadcrumbs text-md">
        <ul>
          <li>
            <Link to="/" className="text-blue-500 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-blue-500 hover:underline">
              Products
            </Link>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <figure>
          <img
            src={image}
            alt={title}
            className="rounded-lg h-96 w-96  object-cover lg:w-full"
          />
        </figure>
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-secondary">{company}</h4>
          <p className="mt-3 text-xl">{formatPrice(price)}</p>

          <p className="mt-6 leading-8">{description}</p>
          <div className="mt-6">
            <h4 className="text-md block font-medium tracking-wider capitalize">
              Color
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    onClick={() => setColor(color)}
                    key={color}
                    type="button"
                    style={{ backgroundColor: color }}
                    className="badge w-6 h-6 mr-2"
                  ></button>
                );
              })}
            </div>
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="amount" className="label">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              id="amount"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="select select-secondary select-bordered select-md"
            >
              {[...Array(20).keys()].map((num) => {
                return (
                  <option key={num} value={num + 1}>
                    {num + 1}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mt-10">
            <button
              className="btn btn-md btn-secondary"
              onClick={() => addToBag()}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
