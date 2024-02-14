import { UserForRegistration } from "./../types/UserForRegistration.interface";
import { registerUser } from "./../api/authApi";
import { useGlobalLoading } from "./useGlobalLoading";
import { useNavigate } from "react-router-dom";
import { useNotification } from "./useNotification";

export const useRegisterUser = (handleEmailExistError: () => void) => {
  const { startLoadingHandler, stopLoadingHandler } = useGlobalLoading();
  const { addNewSuccessNotification, addNewErrorNotification } =
    useNotification();
  const navigate = useNavigate();

  const register = async (data: UserForRegistration) => {
    startLoadingHandler();
    try {
      const response = await registerUser(data);
      if (response.statusCode === 409) {
        handleEmailExistError();
        return;
      }
      if (!response.success) {
        throw new Error(response.message || "Coś poszło nie tak");
      }
      addNewSuccessNotification(response.message);
      navigate("/auth/login");
      addNewSuccessNotification("Możesz się zalogować");
    } catch (error) {
      addNewErrorNotification(error);
    } finally {
      stopLoadingHandler();
    }
  };

  return {
    register,
  };
};
