import { FC } from "react";
import { Product } from "../types/Product.interface";

interface ProductFeaturesProps {
  product: Product;
}

const ProductFeatures: FC<ProductFeaturesProps> = ({ product }) => {
  const mainFeatures = product.attributes.slice(0, 5);
  return (
    <div className="flex flex-col ">
      {mainFeatures.map((feature, index) => (
        <div key={index} className="flex gap-2 text-sm">
          <p className="">{feature.name}:</p>
          <p className="font-semibold">{feature.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductFeatures;
