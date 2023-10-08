import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="h-screen bg-blue-50 bg-pizza dark:bg-primaryDark">
      <Navbar />

      <Outlet />
    </div>
  );
};

export default AppLayout;
