import { SubmitHandler, useForm } from "react-hook-form";

import Image from "../assets/electronics.png";
import Input from "../ui/Input";
import PrimaryButton from "../ui/PrimaryButtont";
import { motion } from "framer-motion";

interface FormInputs {
  email: string;
  password: string;
}

const animations = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    // setError,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      <div className="3xl:text-md m-auto grid h-full max-w-[64rem] grow grid-cols-2 justify-center gap-16 rounded-lg bg-white  p-8 text-sm shadow-md">
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
              <p>{errors.email?.message}</p>
            </div>
            {/* <input
            {...register("password", {
              required: "Hasło jest wymagane",
              minLength: {
                value: 8,
                message: "Hasło musi mieć co najmniej 8 znaków",
              },
            })}
            type="password"
            placeholder="Password"
          /> */}
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
              <p>{errors.password?.message}</p>
            </div>
            <button className="mb-4 text-blue-600 hover:underline">
              Nie pamiętam hasła
            </button>
            <PrimaryButton type="submit" disabled={!isValid && isSubmitted}>
              {isSubmitting ? "Logowanie..." : "Zaloguj"}
            </PrimaryButton>
          </form>
          <div className="flex items-center justify-center">
            <span className=" block h-1 w-full bg-blue-600"></span>
            <p className="relative mt-6 grow bg-white p-2 text-center">
              lub zaloguj się przy użyciu
            </p>
            <span className=" block h-1 w-full bg-blue-600"></span>
          </div>
        </div>
        <div>
          <img src={Image} />
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;
