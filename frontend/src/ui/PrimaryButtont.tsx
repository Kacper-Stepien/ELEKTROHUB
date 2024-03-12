import { FC, ReactNode } from "react";

interface PrimaryButtonProps {
  type: "submit" | "button";
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  type,
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded bg-blue-500 p-2 text-white transition-all  ${disabled ? "cursor-not-allowed bg-gray-500" : "hover:bg-blue-400"} flex items-center justify-center gap-2`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
