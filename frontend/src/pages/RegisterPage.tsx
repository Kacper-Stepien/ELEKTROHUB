import { startLoading, stopLoading } from "../store/features/loadingSlice";

import { BsCheck } from "react-icons/bs";
import Validator from "../utils/Validator";
import { useAppDispatch } from "../store/store";
import useInput from "../hooks/useInput";
import { useRef } from "react";

// import { NotificationStatus } from "../store/features/notificationSlice";

const RegisterPage = () => {
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
    <div className="grid grid-cols-2 justify-center   text-sm 3xl:text-md bg-white p-8 rounded-lg shadow-md  m-auto gap-16 max-w-[64rem]">
      <form onSubmit={submitFormHandler} ref={form}>
        <h2 className="text-2xl bold mb-4">Załóż konto</h2>
        <div className="mb-4">
          <input
            type="text"
            name="firstName"
            placeholder="Imię"
            className={`p-2 w-full border rounded ${
              firstNameHasError && "border-red-600"
            }`}
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <span className="text-xs ml-2 text-red-600">
              Imię musi się składać z co najmniej 2 znaków
            </span>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="surname"
            placeholder="Nazwisko"
            className=" p-2 w-full border rounded"
            value={surname}
            onChange={surnameChangeHandler}
            onBlur={surnameBlurHandler}
          />
          {surnameHasError && (
            <span className="text-xs ml-2 text-red-600">
              Nazwisko musi się składać z co najmniej 2 znaków
            </span>
          )}
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className=" p-2 w-full border rounded"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && (
            <span className="text-xs ml-2 text-red-600">
              Niepoprawny adres e-mail
            </span>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="phone"
            placeholder="Telefon"
            className=" p-2 w-full border rounded"
            value={phone}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
          />
          {phoneHasError && (
            <span className="text-xs ml-2 text-red-600">
              Niepoprawny numer telefonu
            </span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Hasło"
            className="p-2 w-full border rounded"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && (
            <span className="text-xs ml-2 text-red-600">
              Hasło musi się składać z co najmniej 8 znaków
            </span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Potwierdź hasło"
            className=" p-2 w-full border rounded"
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
          />
          {password !== confirmPassword && confirmPasswordIsTouched && (
            <span className="text-xs ml-2 text-red-600">
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
          className="bg-blue-500 text-white p-2 mt-4 rounded w-full hover:bg-blue-400 transition-all"
        >
          ZAŁÓŻ KONTO
        </button>
      </form>
      <div className="text-xl bold mb-4 flex flex-col gap-6">
        <h2 className="text-2xl bold">Ciesz się następującymi korzyściami</h2>
        <ul className="flex flex-col gap-4">
          <li className="flex gap-4">
            <BsCheck className="text-green-700 text-4xl" /> Szybki proces
            zamawiania
          </li>
          <li className="flex gap-4">
            <BsCheck className="text-green-700 text-4xl" />
            Pełna historia wszystkich zamówień
          </li>
          <li className="flex gap-4">
            <BsCheck className="text-green-700 text-4xl" />
            Specjalne kody rabatowe
          </li>
          <li className="flex gap-4">
            <BsCheck className="text-green-700 text-4xl" />
            Dostęp do unikalnych promocji
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RegisterPage;
