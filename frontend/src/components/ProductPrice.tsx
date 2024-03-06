import { FC } from "react";

import Price from "../ui/Price";

interface ProductPriceProps {
  price: number;
  salePrice: number | null;
}

const ProductPrice: FC<ProductPriceProps> = ({ price, salePrice }) => {
  const isSpecialOffer = salePrice && salePrice < price;

  return (
    <div className={`flex flex-col items-end gap-1 `}>
      <Price
        price={isSpecialOffer ? salePrice : price}
        isSalePrice={Number(salePrice) < price}
      />
      {isSpecialOffer && <Price price={price} small />}
    </div>
  );
};

export default ProductPrice;
