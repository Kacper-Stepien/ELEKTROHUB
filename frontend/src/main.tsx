import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./ui/AppLayout.tsx";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import RegisterPage from "./pages/RegisterPage.tsx";
import store from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <div>home</div> },
      { path: "/login", element: <div>login</div> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/cart", element: <div>cart</div> },
      { path: "/products", element: <div>products</div> },
      { path: "/products/:id", element: <div>product</div> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
