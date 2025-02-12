import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/user/userSlice";
import { clearCart } from "../store/cart/cartSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    navigate("/");
    dispatch(logoutUser());
    dispatch(clearCart());
    queryClient.removeQueries();
  };
  const user = useSelector((state) => state.userState.user);
  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {/* USER  */}
        {/* LLINKS */}
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">"hello" {user.username}</p>{" "}
            <button
              className="btn btn-xs btn-outline btn-primary "
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
