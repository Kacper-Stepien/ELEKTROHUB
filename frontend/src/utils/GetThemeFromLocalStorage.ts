import { Theme } from "../types/Theme";

export const getThemeFromLocalStorage = () => {
  let theme = localStorage.getItem("ElektroHub:theme");
  if (theme !== "dark" && theme !== "light") {
    theme = "dark";
    localStorage.setItem("ElektroHub:theme", "dark");
  }
  return theme as Theme;
};
