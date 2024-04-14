import { AnimatePresence } from "framer-motion";
import AppLayout from "../pages/AppLayout";
import AuthPage from "../pages/AuthPage";
import RegisterPage from "../pages/RegisterPage";
import { createBrowserRouter } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage";
import ProductPage from "../pages/ProductPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <div>home</div> },
      {
        path: "/auth/:type",
        element: (
          <AnimatePresence>
            <AuthPage />
          </AnimatePresence>
        ),
      },
      { path: "/login", element: <div>login</div> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/cart", element: <div>cart</div> },
      {
        path: "/:category/:subcategory?/:subsubcategory?",
        element: <ProductsPage />,
      },
      { path: "/products", element: <div>products</div> },
      { path: "/product/:id", element: <ProductPage /> },
    ],
  },
]);
