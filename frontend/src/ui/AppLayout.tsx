import Footer from "./Footer";
import LoadingSpinner from "./LoadingSpinner";
import Menu from "./Menu";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";

// import Notification from "./Notification";

const AppLayout = () => {
  const isLoading = useAppSelector((state) => state.loading.loading);

  return (
    <div
      className={`min-h-screen bg-blue-50  dark:bg-primaryDark flex flex-col justify-between ${
        isLoading ? "overflow-hidden h-screen" : ""
      }`}
    >
      <div>
        <Navbar />
        <Menu />
      </div>
      <div className=" grow px-4 py-4 md:px-6 md:py-6 flex items-center">
        <Outlet />
      </div>
      <Footer />
      {isLoading && <LoadingSpinner />}
      {/* <Notification /> */}
    </div>
  );
};

export default AppLayout;
