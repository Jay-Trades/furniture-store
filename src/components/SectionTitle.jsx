import React from "react";

const SectionTitle = ({ text }) => {
  return (
    <div className="border-b border-base-300 pb-5">
      <h2 className="text-3xl font-medium tracking-wider capitalize">{text}</h2>
    </div>
  );
};

export default SectionTitle;

// 1. Create SectionTitle Component:

//    - Define a functional component named `SectionTitle`.

// 2. Component Props:

//    - The component should accept a prop named `text`.

// 3. Component Structure:

//    - Return a `div` element with the classes `border-b border-base-300 pb-5`.
//    - Inside the `div`, place an `h2` element with the classes `text-3xl`, `font-medium`, `tracking-wider`, and `capitalize`.
//    - Set the content of the `h2` element to the value of the `text` prop.

// 4. Export SectionTitle Component:
//    - Export the `SectionTitle` component as the default export of the module.
