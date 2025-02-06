import React from "react";

const About = () => {
  return (
    <>
      <div className="flex flex-warp gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight">
          We Love
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              comfy
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </>
  );
};

export default About;

// - About Component:
//   - Define the `About` component.
//     - Return a fragment containing the following elements:
//       - A `div` with classes `flex`, `flex-wrap`, `gap-2`, `sm:gap-x-6`, `items-center`, and `justify-center`.
//         - Inside the `div`, an `h1` with classes `text-4xl`, `font-bold`, `leading-none`, and `tracking-tight`, with the text "We love".
//         - Inside the `div`, a `div` with classes `stats`, `bg-primary`, and `shadow`.
//           - Inside the nested `div`, another `div` with class `stat`.
//             - Inside this `div`, a `div` with classes `stat-title`, `text-primary-content`, `text-4xl`, `font-bold`, and `tracking-widest`, containing the text "comfy".
//       - A `p` element with classes `mt-6`, `text-lg`, `leading-8`, `max-w-2xl`, and `mx-auto`, containing sample Lorem ipsum text.
