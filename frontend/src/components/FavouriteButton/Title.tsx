import { FC } from "react";

interface TitleProps {
  numberOfItems: number;
}

const Title: FC<TitleProps> = ({ numberOfItems }) => {
  return (
    <h3 className="mb-4 text-lg font-semibold">Ulubione ({numberOfItems})</h3>
  );
};

export default Title;
