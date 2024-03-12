import { FC } from "react";
import { Product } from "../types/Product.interface";
import ProductRatingStars from "./ProductRatingStars";
import ProductPrice from "./ProductPrice";
import ProductFeatures from "./ProductFeatures";
import AvailabilityBar from "./AvailabilityBar";
import PrimaryButton from "../ui/PrimaryButtont";
import { FaCartPlus } from "react-icons/fa";
import ProductCardFooter from "./ProductCardFooter";
import { useAppDispatch } from "../store/store";
import { addProductToCart } from "../store/features/cartSlice";

const API_URL = import.meta.env.VITE_API_URL as string;

interface ProductCardProps {
  product: Product;
}
const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { name, photos, averageRating, numberOfReviews, price, stock } =
    product;
  const imgageUrl = `${API_URL}/images/products/${photos[0]}`;

  return (
    <div className="flex w-full flex-wrap justify-between gap-6 rounded-md bg-white p-6 text-primaryDark shadow-sm dark:bg-primaryDark dark:text-blue-50">
      {product.photos.length > 0 && (
        <img src={imgageUrl} alt={`${name}-1-photo`} className="w-52" />
      )}
      <div className="flex flex-col gap-1">
        <h2 className="font-bold ">{name}</h2>
        <ProductRatingStars
          averageRating={averageRating}
          numberOfReviews={numberOfReviews}
        />
        <div className="mt-4">
          <ProductFeatures product={product} />
        </div>
      </div>
      <div className="flex flex-col gap-8 border-l-2 pl-6 dark:border-secondaryDark">
        <ProductPrice price={price} salePrice={8000} />
        <AvailabilityBar stock={stock} total={10} />
        <PrimaryButton
          type="button"
          disabled={stock === 0}
          onClick={() => {
            dispatch(addProductToCart(product));
          }}
        >
          <FaCartPlus className="text-xl" />
          Do koszyka
        </PrimaryButton>
      </div>
      <div className="grow-1 basis-full ">
        <ProductCardFooter product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
