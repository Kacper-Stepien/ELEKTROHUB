import { FC } from "react";
import { formatTotalNumber } from "../utils/formatTotalNumber";

interface Price {
  price: number;
  isSalePrice?: boolean;
  small?: boolean;
}

const Price: FC<Price> = ({
  price,
  isSalePrice: salePrice = false,
  small: isSmall = false,
}) => {
  const decimalPart = price.toString().split(".")[1] || "00";
  const totalPart = price.toString().split(".")[0];
  return (
    <div
      className={`flex items-center gap-2 ${salePrice ? "text-red-500" : ""}`}
    >
      <p className={` ${isSmall ? "text-2xl" : "text-6xl font-bold"}`}>
        {formatTotalNumber(Number(totalPart))}
      </p>
      <div className=" flex flex-col justify-between">
        <p className={`text-lg  ${isSmall ? "text-xs" : "text-lg font-bold"}`}>
          {decimalPart}
        </p>
        <p className={`text-lg  ${isSmall ? "text-xs" : "text-lg font-bold"}`}>
          zł
        </p>
      </div>
    </div>
  );
};

export default Price;
