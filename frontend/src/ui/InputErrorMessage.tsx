import { FC, ReactNode } from "react";

import { Colors } from "../types/Colors.enum";

interface InputErrorMessageProps {
  children: ReactNode;
}

const InputErrorMessage: FC<InputErrorMessageProps> = ({ children }) => {
  return <p className={`text-${Colors.ERROR_COLOR} ml-2`}>{children}</p>;
};

export default InputErrorMessage;
