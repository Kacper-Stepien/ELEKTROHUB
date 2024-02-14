import { loginUser } from "../api/authApi";
import { setUser } from "../store/features/userSlice";
import { useAppDispatch } from "../store/store";
import { useGlobalLoading } from "./useGlobalLoading";
import { useNavigate } from "react-router-dom";
import { useNotification } from "./useNotification";

export const useLoginUser = (handleDataAreInvalid: () => void) => {
  const { startLoadingHandler, stopLoadingHandler } = useGlobalLoading();
  const { addNewSuccessNotification, addNewErrorNotification } =
    useNotification();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const login = async (email: string, password: string) => {
    startLoadingHandler();
    try {
      const response = await loginUser(email, password);
      if (response.statusCode === 401) {
        handleDataAreInvalid();
        return;
      }
      if (!response.success) {
        throw new Error(response.message || "Coś poszło nie tak");
      }
      dispatch(setUser(response.data));
      addNewSuccessNotification(response.message);
      navigate("/");
      addNewSuccessNotification("Możesz się zalogować");
    } catch (error) {
      addNewErrorNotification(error);
    } finally {
      stopLoadingHandler();
    }
  };
  return {
    login,
  };
};
