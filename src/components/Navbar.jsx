import React from "react";
import { NavLink } from "react-router-dom";
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/user/userSlice";

//useEFFECT CODE + local storage version to get theme. This works fine just practicing redux
// const themes = {
//   light: "pastel",
//   dark: "dracula",
// };

// const getThemeFromLocalStorage = () => {
//   const theme = localStorage.getItem("theme");
//   return theme ? theme : themes.light;
// };

const Navbar = () => {
  //   const [theme, setTheme] = useState(getThemeFromLocalStorage());

  //   const toggleTheme = () => {
  //     const newTheme = theme === themes.light ? themes.dark : themes.light;
  //     setTheme(newTheme);
  //   };

  //   useEffect(() => {
  //     document.documentElement.setAttribute("data-theme", theme);
  //     localStorage.setItem("theme", theme);
  //   }, [theme]);

  //access items in cart from redux state
  const dispatch = useDispatch();

  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
  const user = useSelector((state) => state.userState.user);

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element ">
        <div className="navbar-start">
          {/* Title */}
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center "
          >
            Nordic
          </NavLink>
          {/* DROP DOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="rounded-box w-52 menu menu-sm dropdown-content mt-3 z-[1] p-w shadow bg-base-200"
            >
              <li>
                <NavLink
                  to="/"
                  className="capitalize btn btn-ghost text-xl sm:text-m"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="capitalize btn btn-ghost text-xl sm:text-m"
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/products"
                  className="capitalize btn btn-ghost text-xl sm:text-m"
                >
                  Products
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/cart"
                  className="capitalize btn btn-ghost text-xl sm:text-m"
                >
                  Cart
                </NavLink>
              </li>
              {user ? (
                <>
                  <li>
                    <NavLink
                      to="/checkout"
                      className="capitalize btn btn-ghost text-xl sm:text-m"
                    >
                      Checkout
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/orders"
                      className="capitalize btn btn-ghost text-xl sm:text-m"
                    >
                      Orders
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <li>
              <NavLink
                to="/"
                className="capitalize btn btn-ghost text-xl sm:text-m"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="capitalize btn btn-ghost text-xl sm:text-m"
              >
                About
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/products"
                className="capitalize btn btn-ghost text-xl sm:text-m"
              >
                Products
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/cart"
                className="capitalize btn btn-ghost text-xl sm:text-m"
              >
                Cart
              </NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <NavLink
                    to="/checkout"
                    className="capitalize btn btn-ghost text-xl sm:text-m"
                  >
                    Checkout
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/orders"
                    className="capitalize btn btn-ghost text-xl sm:text-m"
                  >
                    Order
                  </NavLink>
                </li>
              </>
            ) : (
              <li></li>
            )}
          </ul>
        </div>
        {/* THEME SETUPS        */}
        <label className="swap swap-rotate">
          <input type="checkbox" onClick={() => dispatch(toggleTheme())} />
          <BsSunFill className="swap-on h-4 w-4" />

          <BsMoonFill className="swap-off h-4 w-4" />
        </label>
        {/* CART SETUP */}

        <div className="navbar-end hidden lg:flex">
          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                {numItemsInCart}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
