import { RegisterOptions, UseFormRegister } from "react-hook-form";

import { FC } from "react";

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  isError: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
}

const Input: FC<InputProps> = ({
  name,
  type,
  placeholder,
  isError,
  register,
  rules,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, rules)}
      className={`w-full rounded border-2 p-2  ${isError && "border-red-600 focus:border-red-600"} focus:border-blue-600 focus:outline-none`}
    />
  );
};

export default Input;
