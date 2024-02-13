import { startLoading, stopLoading } from "../store/features/loadingSlice";

import { BsCheck } from "react-icons/bs";
import Validator from "../utils/Validator";
import { motion } from "framer-motion";
import { useAppDispatch } from "../store/store";
import useInput from "../hooks/useInput";
import { useRef } from "react";

const animations = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const form = useRef<HTMLFormElement>(null);

  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    setIsTouched: setFirstNameIsTouched,
    reset: resetFirstName,
  } = useInput(Validator.isName);

  const {
    value: surname,
    isValid: surnameIsValid,
    hasError: surnameHasError,
    valueChangeHandler: surnameChangeHandler,
    inputBlurHandler: surnameBlurHandler,
    setIsTouched: setSurnameIsTouched,
    reset: resetSurname,
  } = useInput(Validator.isSurname);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    setIsTouched: setEmailIsTouched,
    reset: resetEmail,
  } = useInput(Validator.isEmail);

  const {
    value: phone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    setIsTouched: setPhoneIsTouched,
    reset: resetPhone,
  } = useInput(Validator.isPhone);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    setIsTouched: setPasswordIsTouched,
    reset: resetPassword,
  } = useInput(Validator.isPassword);

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    isTouched: confirmPasswordIsTouched,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    setIsTouched: setConfirmPasswordIsTouched,
    reset: resetConfirmPassword,
  } = useInput(Validator.isPassword);

  const formIsValid =
    firstNameIsValid &&
    surnameIsValid &&
    emailIsValid &&
    phoneIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid;

  const resetForm = () => {
    resetFirstName();
    resetSurname();
    resetEmail();
    resetPhone();
    resetPassword();
    resetConfirmPassword();
    form.current?.reset();
  };

  const setFormIsTouched = () => {
    setFirstNameIsTouched(true);
    setSurnameIsTouched(true);
    setEmailIsTouched(true);
    setPhoneIsTouched(true);
    setPasswordIsTouched(true);
    setConfirmPasswordIsTouched(true);
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    // dispatch(
    //   showNotification({
    //     message: "Utworzono konto. Możesz się zalogować.",
    //     type: NotificationStatus.SUCCESS,
    //   })
    // );

    if (!formIsValid) {
      setFormIsTouched();
      return;
    }

    console.log("Formularz został wysłany");
    dispatch(startLoading());
    try {
      const response = await fetch("http://localhost:8000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: firstName,
          surname,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Coś poszło nie tak");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
    resetForm();
  };

  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      <div className="3xl:text-md m-auto grid   max-w-[64rem] grid-cols-2 justify-center gap-16 rounded-lg bg-white  p-8 text-sm shadow-md">
        <form onSubmit={submitFormHandler} ref={form}>
          <h2 className="bold mb-4 text-2xl">Załóż konto</h2>
          <div className="mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="Imię"
              className={`w-full rounded border p-2 ${
                firstNameHasError && "border-red-600"
              }`}
              value={firstName}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
            />
            {firstNameHasError && (
              <span className="ml-2 text-xs text-red-600">
                Imię musi się składać z co najmniej 2 znaków
              </span>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="surname"
              placeholder="Nazwisko"
              className=" w-full rounded border p-2"
              value={surname}
              onChange={surnameChangeHandler}
              onBlur={surnameBlurHandler}
            />
            {surnameHasError && (
              <span className="ml-2 text-xs text-red-600">
                Nazwisko musi się składać z co najmniej 2 znaków
              </span>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className=" w-full rounded border p-2"
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailHasError && (
              <span className="ml-2 text-xs text-red-600">
                Niepoprawny adres e-mail
              </span>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="phone"
              placeholder="Telefon"
              className=" w-full rounded border p-2"
              value={phone}
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
            />
            {phoneHasError && (
              <span className="ml-2 text-xs text-red-600">
                Niepoprawny numer telefonu
              </span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Hasło"
              className="w-full rounded border p-2"
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordHasError && (
              <span className="ml-2 text-xs text-red-600">
                Hasło musi się składać z co najmniej 8 znaków
              </span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Potwierdź hasło"
              className=" w-full rounded border p-2"
              value={confirmPassword}
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
            />
            {password !== confirmPassword && confirmPasswordIsTouched && (
              <span className="ml-2 text-xs text-red-600">
                Hasła muszą być identyczne
              </span>
            )}
          </div>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              className="mr-2 cursor-pointer"
            />
            <span className="cursor-pointer">
              * Oświadczam, że zapoznałem(-am) się i akceptuję treść regulaminu.
            </span>
          </label>
          <button
            type="submit"
            className="mt-4 w-full rounded bg-blue-500 p-2 text-white transition-all hover:bg-blue-400"
          >
            ZAŁÓŻ KONTO
          </button>
        </form>
        <div className="bold mb-4 flex flex-col gap-6 text-xl">
          <h2 className="bold text-2xl">Ciesz się następującymi korzyściami</h2>
          <ul className="flex flex-col gap-4">
            <li className="flex gap-4">
              <BsCheck className="text-4xl text-green-700" /> Szybki proces
              zamawiania
            </li>
            <li className="flex gap-4">
              <BsCheck className="text-4xl text-green-700" />
              Pełna historia wszystkich zamówień
            </li>
            <li className="flex gap-4">
              <BsCheck className="text-4xl text-green-700" />
              Specjalne kody rabatowe
            </li>
            <li className="flex gap-4">
              <BsCheck className="text-4xl text-green-700" />
              Dostęp do unikalnych promocji
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="w-2xl h-96 bg-blue-500">Rejestracja</div> */}
    </motion.div>
  );
};

export default RegisterForm;
