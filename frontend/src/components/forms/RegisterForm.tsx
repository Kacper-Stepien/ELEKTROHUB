import { SubmitHandler, useForm } from "react-hook-form";
import {
  emailRegex,
  nameRegex,
  passwordRegex,
  phoneRegex,
  surnameRegex,
} from "../../utils/regexes";

import Input from "../../ui/Input";
import InputErrorMessage from "../../ui/InputErrorMessage";
import PrimaryButton from "../../ui/PrimaryButtont";
import { registerUser } from "../../api/authApi";
import { useGlobalLoading } from "../../hooks/useGlobalLoading";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";

interface FormInputs {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const RegisterForm = () => {
  const { startLoadingHandler, stopLoadingHandler } = useGlobalLoading();
  const { addNewSuccessNotification, addNewErrorNotification } =
    useNotification(3000);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid, isSubmitted },
    setError,
  } = useForm<FormInputs>({
    mode: "onBlur",
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = async (data, event) => {
    event?.preventDefault();
    startLoadingHandler();
    try {
      const response = await registerUser(data);
      if (response.statusCode === 409) {
        setError("email", {
          type: "manual",
          message: response.message,
        });
        return;
      }
      if (!response.success) {
        throw new Error(response.message || "Coś poszło nie tak");
      }
      addNewSuccessNotification(response.message);
      reset();
      navigate("/auth/login");
      addNewSuccessNotification("Możesz się zalogować");
    } catch (error) {
      addNewErrorNotification(error);
    } finally {
      stopLoadingHandler();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="bold mb-4 text-2xl">Załóż konto</h2>
      <div className="mb-4">
        <Input
          name="name"
          type="text"
          placeholder="Imię"
          isError={!!errors.name}
          register={register}
          rules={{
            required: "Imię jest wymagane",
            pattern: {
              value: nameRegex,
              message: "Imię jest niepoprawne",
            },
          }}
        />
        <InputErrorMessage>{errors.name?.message}</InputErrorMessage>
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
