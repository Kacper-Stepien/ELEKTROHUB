import { useAppSelector } from "../store/store";

export const useLoggedInUser = () => {
  const user = useAppSelector((state) => state.user);
  return {
    ...user,
    loggedIn: Boolean(user._id && user.email),
  };
};
