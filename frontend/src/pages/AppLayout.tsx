import CategoriesMenu from "../components/categories/CategoriesMenu";
import Footer from "../components/Footer";
import LoadingSpinner from "../ui/LoadingSpinner";
import Navbar from "../components/Navbar";
import Notifications from "../ui/Notifications";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";

// import Notification from "./Notification";

const AppLayout = () => {
  const isLoading = useAppSelector((state) => state.loading.loading);

  return (
    <div
      className={`flex min-h-screen  flex-col justify-between bg-blue-50 text-primaryDark dark:bg-secondaryDark dark:text-blue-50 ${
        isLoading ? "h-screen overflow-hidden" : ""
      }`}
    >
      <div>
        <Navbar />
        <CategoriesMenu />
      </div>
      <div className=" flex grow px-4 py-4 md:px-6 md:py-6 ">
        <Outlet />
      </div>
      <Footer />
      {isLoading && <LoadingSpinner />}
      <Notifications clearTime={3000} />
    </div>
  );
};

export default AppLayout;
