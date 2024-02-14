import { NavLink, useNavigate, useParams } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import LoginFormContainer from "../components/LoginFormContainer";
import RegisterFormContainer from "../components/RegisterFormContainer";
import { useEffect } from "react";

const AuthPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (type !== "login" && type !== "register") {
      navigate("/auth/login");
    }
  }, [type]);

  return (
    <div className="flex-columns mx-auto w-full max-w-3xl items-center ">
      <nav>
        <ul className="mx-auto mb-4 flex w-min items-center   rounded-full bg-gray-300  p-1 text-center">
          <li className="text-lg">
            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                isActive
                  ? "rounded-full bg-blue-600 px-2 py-1  text-white"
                  : "px-2"
              }
            >
              Logowanie
            </NavLink>
          </li>
          <li className="text-lg">
            <NavLink
              to="/auth/register"
              className={({ isActive }) =>
                isActive
                  ? "rounded-full bg-blue-600 px-2 py-1  text-white"
                  : "px-2 "
              }
            >
              Rejestracja
            </NavLink>
          </li>
        </ul>
      </nav>

      <AnimatePresence mode="wait">
        {type === "register" ? (
          <RegisterFormContainer key="register" />
        ) : (
          <LoginFormContainer key="login" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
