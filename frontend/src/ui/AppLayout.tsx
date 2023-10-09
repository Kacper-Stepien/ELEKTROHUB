import Footer from "./Footer";
import Menu from "./Menu";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="h-screen bg-blue-50 bg-pizza dark:bg-primaryDark flex flex-col justify-between">
      <div>
        <Navbar />
        <Menu />
      </div>
      <div className=" grow px-4 py-2 md:px-6 md:py-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
