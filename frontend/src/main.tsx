import "./index.css";

import Notifications from "./ui/Notifications.tsx";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routerConfig.tsx";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <Notifications clearTime={3000} />
    </Provider>
  </React.StrictMode>
);
