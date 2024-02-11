import { ThemeState } from "../../types/ThemeState";
import { createSlice } from "@reduxjs/toolkit";
import { getThemeFromLocalStorage } from "./../../utils/GetThemeFromLocalStorage";

const themeFromLocalStorage = getThemeFromLocalStorage();
console.log("themeFromLocalStorage", themeFromLocalStorage);

const initialState: ThemeState = {
  theme: themeFromLocalStorage,
};

if (initialState.theme === "dark") {
  document.documentElement.classList.add("dark");
}

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeDark(state) {
      state.theme = "dark";
    },
    setThemeLight(state) {
      state.theme = "light";
    },
  },
});

export const { setThemeDark, setThemeLight } = ThemeSlice.actions;
export default ThemeSlice.reducer;
