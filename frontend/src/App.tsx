import { useAppDispatch, useAppSelector } from "./store/store";

import { setTheme } from "./store/features/themeSlice";

function App() {
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
      <p>Sklep</p>
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
  );
}

export default App;
