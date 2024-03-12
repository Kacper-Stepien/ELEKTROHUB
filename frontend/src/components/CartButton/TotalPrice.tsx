import { FC } from "react";
import { formatTotalNumber } from "../../utils/formatTotalNumber";

interface TotalPriceProps {
  totalPrice: number;
}

const TotalPrice: FC<TotalPriceProps> = ({ totalPrice }) => {
  return (
    <div className="my-4 flex justify-between text-lg font-semibold">
      <p>Do zapłaty:</p>
      <p>{formatTotalNumber(totalPrice)} zł</p>
    </div>
  );
};

export default TotalPrice;
