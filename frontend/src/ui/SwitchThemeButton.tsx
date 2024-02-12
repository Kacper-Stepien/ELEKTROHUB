import { FaMoon, FaSun } from "react-icons/fa";
import { setThemeDark, setThemeLight } from "../store/features/themeSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const SwitchThemeButton = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    if (theme === "light") {
      dispatch(setThemeDark());
      localStorage.setItem("ElektroHub:theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      dispatch(setThemeLight());
      localStorage.setItem("ElektroHub:theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      className="btn btn-outline-secondary text-blue-950 dark:text-blue-100  justify-self-end hover:scale-125 transition-all"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <FaMoon className="" aria-label="ciemny motyw" />
      ) : (
        <FaSun className="" aria-label="jasny motyw" />
      )}
    </button>
  );
};

export default SwitchThemeButton;
