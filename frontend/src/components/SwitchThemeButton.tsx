import { FaMoon, FaSun } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/store";

import { setTheme } from "../store/features/themeSlice";

const SwitchThemeButton = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    if (theme === "light") {
      dispatch(setTheme({ theme: "dark" }));
    } else {
      dispatch(setTheme({ theme: "light" }));
    }
  };

  return (
    <button
      className="btn btn-outline-secondary text-blue-950 dark:text-blue-100 text-md justify-self-end "
      onClick={toggleTheme}
    >
      {theme === "light" ? <FaMoon className="" /> : <FaSun className="" />}
    </button>
  );
};

export default SwitchThemeButton;
