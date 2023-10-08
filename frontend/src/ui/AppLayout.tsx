import { useAppDispatch, useAppSelector } from "../store/store";

import { Outlet } from "react-router-dom";
import { setTheme } from "../store/features/themeSlice";

const AppLayout = () => {
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
    <div className="h-screen bg-blue-50 bg-pizza dark:bg-primaryDark">
      <h1>AppLayout</h1>
      <Outlet />
      <div className="h-screen bg-blue-50 bg-pizza dark:bg-primaryDark">
        <button onClick={toggleTheme}>Toggle theme</button>
      </div>
    </div>
  );
};

export default AppLayout;
