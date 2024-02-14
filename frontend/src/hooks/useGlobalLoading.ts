import { startLoading, stopLoading } from "../store/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

export const useGlobalLoading = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.loading.loading);

  const startLoadingHandler = () => {
    dispatch(startLoading());
  };

  const stopLoadingHandler = () => {
    dispatch(stopLoading());
  };

  return { isLoading, startLoadingHandler, stopLoadingHandler };
};
