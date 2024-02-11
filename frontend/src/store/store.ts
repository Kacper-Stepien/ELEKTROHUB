import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import loadingReucer from "./features/loadingSlice";
import notificationReducer from "./features/notificationSlice";
import themeReducer from "./features/themeSlice";
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeReducer,
    loading: loadingReucer,
    notification: notificationReducer,
  },
});

export default store;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
