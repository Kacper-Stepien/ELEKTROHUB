import CategoriesMenu from "../components/CategoriesMenu";
import Footer from "../components/Footer";
import LoadingSpinner from "./LoadingSpinner";
import Navbar from "../components/Navbar";
import Notifications from "./Notifications";
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
        <CategoriesMenu />
      </div>
      <div className=" grow px-4 py-4 md:px-6 md:py-6 flex items-center">
        <Outlet />
      </div>
      <Footer />
      {isLoading && <LoadingSpinner />}
      <Notifications clearTime={3000} />
    </div>
  );
};

export default AppLayout;
