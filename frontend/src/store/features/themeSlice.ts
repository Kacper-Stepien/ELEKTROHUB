import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ThemeState } from "../../types/ThemeState";

const initialState: ThemeState = {
  theme: localStorage.getItem("ElektroHub:theme") || "dark",
};

if (initialState.theme === "dark") {
  document.documentElement.classList.add("dark");
}

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<{ theme: string }>) {
      state.theme = action.payload.theme;
      localStorage.setItem("ElektroHub:theme", action.payload.theme);
      if (action.payload.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const { setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
