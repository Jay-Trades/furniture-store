import { useState } from "react";

const FormRange = ({ label, name, size, price }) => {
  const step = 10;
  const maxPrice = 100000;
  //   const selectedPrice = 10000;
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>
          {Number(selectedPrice / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </label>
      <input
        className={`range range-primary ${size}`}
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        step={step}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
      />
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-md">0</span>
        <span className="font-bold text-md">
          Max :
          {Number(selectedPrice / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
    </div>
  );
};

export default FormRange;
