import { SubmitHandler, useForm } from "react-hook-form";
import {
  emailRegex,
  nameRegex,
  passwordRegex,
  phoneRegex,
  surnameRegex,
} from "../../utils/regexes";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";

import Input from "../../ui/Input";
import InputErrorMessage from "../../ui/InputErrorMessage";
import PrimaryButton from "../../ui/PrimaryButtont";
import { useAppDispatch } from "../../store/store";
import { useRef } from "react";

interface FormInputs {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting, isValid, isSubmitted },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data, event) => {
    event?.preventDefault();
    console.log(data);
    // reset();
  };

  const dispatch = useAppDispatch();
  const form = useRef<HTMLFormElement>(null);

  // const submitFormHandler = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   // dispatch(
  //   //   showNotification({
  //   //     message: "Utworzono konto. Możesz się zalogować.",
  //   //     type: NotificationStatus.SUCCESS,
  //   //   })
  //   // );

  //   if (!formIsValid) {
  //     setFormIsTouched();
  //     return;
  //   }

  //   console.log("Formularz został wysłany");
  //   dispatch(startLoading());
  //   try {
  //     const response = await fetch("http://localhost:8000/api/users/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: firstName,
  //         surname,
  //         email,
  //         phone,
  //         password,
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log(data);
  //     if (!response.ok) {
  //       throw new Error(data.message || "Coś poszło nie tak");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     dispatch(stopLoading());
  //   }
  //   resetForm();
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={form}>
      <h2 className="bold mb-4 text-2xl">Załóż konto</h2>
      <div className="mb-4">
        <Input
          name="firstName"
          type="text"
          placeholder="Imię"
          isError={!!errors.firstName}
          register={register}
          rules={{
            required: "Imię jest wymagane",
            pattern: {
              value: nameRegex,
              message: "Imię jest niepoprawne",
            },
          }}
        />
        <InputErrorMessage>{errors.firstName?.message}</InputErrorMessage>
      </div>

      <div className="mb-4">
        <Input
          name="surname"
          type="text"
          placeholder="Nazwisko"
          isError={!!errors.surname}
          register={register}
          rules={{
            required: "Nazwisko jest wymagane",
            pattern: {
              value: surnameRegex,
              message: "Nazwisko jest niepoprawne",
            },
          }}
        />
        <InputErrorMessage>{errors.surname?.message}</InputErrorMessage>
      </div>

      <div className="mb-4">
        <Input
          name="email"
          type="text"
          placeholder="Email"
          isError={!!errors.email}
          register={register}
          rules={{
            required: "Email jest wymagany",
            pattern: {
              value: emailRegex,
              message: "Email jest niepoprawny",
            },
          }}
        />
        <InputErrorMessage>{errors.email?.message}</InputErrorMessage>
      </div>

      <div className="mb-4">
        <Input
          name="phone"
          type="text"
          placeholder="Telefon"
          isError={!!errors.phone}
          register={register}
          rules={{
            required: "Telefon jest wymagany",
            pattern: {
              value: phoneRegex,
              message: "Telefon jest niepoprawny",
            },
          }}
        />
        <InputErrorMessage>{errors.phone?.message}</InputErrorMessage>
      </div>
      <div className="mb-4">
        <Input
          name="password"
          type="password"
          placeholder="Hasło"
          isError={!!errors.password}
          register={register}
          rules={{
            required: "Hasło jest wymagane",
            pattern: {
              value: passwordRegex,
              message: "Hasło jest niepoprawne",
            },
          }}
        />
        <InputErrorMessage>{errors.password?.message}</InputErrorMessage>
      </div>
      <div className="mb-4">
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Potwierdź hasło"
          isError={!!errors.confirmPassword}
          register={register}
          rules={{
            required: "Potwierdzenie hasła jest wymagane",
            validate: (value) =>
              value === getValues("password") || "Hasła muszą być takie same",
          }}
        />
        <InputErrorMessage>{errors.confirmPassword?.message}</InputErrorMessage>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register("acceptTerms", {
              required: "Zaakceptowanie regulaminu jest wymagane",
            })}
            className="mr-2 cursor-pointer"
          />
          <span className="cursor-pointer">
            * Oświadczam, że zapoznałem(-am) się i akceptuję treść regulaminu.
          </span>
        </label>
        <InputErrorMessage>{errors.acceptTerms?.message}</InputErrorMessage>
      </div>
      <PrimaryButton type="submit" disabled={!isValid && isSubmitted}>
        Załóż konto
      </PrimaryButton>
    </form>
  );
};

export default RegisterForm;
