import { FC } from "react";
import { Product } from "../types/Product.interface";
import { FaTruckFast, FaShop, FaPhoneFlip } from "react-icons/fa6";

interface ProductCardFooterProps {
  product: Product;
  vertical?: boolean;
  phone?: boolean;
}

const ProductCardFooter: FC<ProductCardFooterProps> = ({
  product,
  vertical = false,
  phone = true,
}) => {
  const isAvailable = product.stock > 0;
  if (!isAvailable) {
    return (
      <div
        className={`flex ${vertical ? "flex-col" : ""} justify-between text-sm`}
      >
        <p className="text-center font-bold text-red-500">
          Produkt niedostępny
        </p>
        <div className="flex items-center gap-2">
          <FaPhoneFlip />
          <p>Zadzwoń i zapytaj o dostępność (782 748 757)</p>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`flex ${vertical ? "flex-col gap-2" : ""} justify-between text-sm`}
    >
      <div
        className={`flex ${vertical ? "flex-col gap-2" : " items-center gap-6"} `}
      >
        <div className="flex items-center gap-2">
          <FaTruckFast />
          <p>Wysyłka w 24h</p>
        </div>
        <div className="flex items-center gap-2">
          <FaShop />
          <p>W sklpeie już jutro</p>
        </div>
      </div>
      {phone && (
        <div className="flex items-center gap-2">
          <FaPhoneFlip />
          <p>Zadzwoń i zamów (782 748 757)</p>
        </div>
      )}
    </div>
  );
};

export default ProductCardFooter;
