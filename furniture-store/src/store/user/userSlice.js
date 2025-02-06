import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  light: "pastel",
  dark: "dracula",
};
const getUserFromLocal = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};
const getThemeFromLocalStorage = () => {
  const tempTheme = localStorage.getItem("theme") || themes.light;
  document.documentElement.setAttribute("data-theme", tempTheme);
  return tempTheme;
};

const initialState = {
  user: getUserFromLocal(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      console.log(action.payload);
      state.user = action.payload.user;
      state.user.jwt = action.payload.jwt;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logoutUser(state) {
      state.user = null;
      // localStorage.clear()
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
    },
    toggleTheme(state) {
      state.theme = state.theme === "pastel" ? "dracula" : "pastel";
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
