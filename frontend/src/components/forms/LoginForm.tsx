import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import InputErrorMessage from "../../ui/InputErrorMessage";
import PrimaryButton from "../../ui/PrimaryButtont";

interface FormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    // setError,
  } = useForm<FormInputs>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="bold mb-4 text-2xl">Zaloguj się</h2>
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
                value: /^\S+@\S+$/i,
                message: "Email jest niepoprawny",
              },
            }}
          />
          <InputErrorMessage>{errors.email?.message}</InputErrorMessage>
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
              minLength: {
                value: 8,
                message: "Hasło musi mieć co najmniej 8 znaków",
              },
            }}
          />
          <InputErrorMessage>{errors.password?.message}</InputErrorMessage>
        </div>
        <button className="mb-4 text-blue-600 hover:underline">
          Nie pamiętam hasła
        </button>
        <PrimaryButton type="submit" disabled={!isValid && isSubmitted}>
          {isSubmitting ? "Logowanie..." : "Zaloguj"}
        </PrimaryButton>
      </form>
      <div className="mt-6 flex items-center justify-center ">
        <span className=" block h-[0.1rem] w-full bg-gray-600"></span>
        <p className="relative block  w-full grow whitespace-nowrap  p-2 text-center">
          lub zaloguj się przy użyciu
        </p>
        <span className=" block h-[0.1rem] w-full bg-gray-600"></span>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <button className="flex w-36 items-center justify-center gap-2 rounded bg-blue-600 p-2 text-white hover:bg-blue-500">
          <FaFacebookF />
          Facebook
        </button>
        <button className="flex w-36 items-center justify-center gap-2 rounded bg-red-600 p-2 text-white transition-all hover:bg-red-500">
          <FaGoogle />
          Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
