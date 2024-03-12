import { FC } from "react";

interface TitleProps {
  numberOfCartItems: number;
}

const Title: FC<TitleProps> = ({ numberOfCartItems }) => {
  return (
    <h3 className="mb-4 text-lg font-semibold">
      Twój koszyk ({numberOfCartItems})
    </h3>
  );
};

export default Title;
