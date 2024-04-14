import { FC } from "react";
import { Product } from "../types/Product.interface";
import ProductRatingStars from "./ProductRatingStars";
import ProductFeatures from "./ProductFeatures";
const API_URL = import.meta.env.VITE_API_URL as string;
import ProductPrice from "./ProductPrice";
import PrimaryButton from "../ui/PrimaryButtont";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { useAppDispatch } from "../store/store";
import {
  addProductToFavorite,
  removeProductFromFavorite,
} from "../store/features/favouriteProductsSlice";
import { addProductToCart } from "../store/features/cartSlice";
import useProductIsInFavourites from "../hooks/useProductIsInFavourites";
import { useNotification } from "../hooks/useNotification";
import ProductCardFooter from "./ProductCardFooter";
import Line from "../ui/Line";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const isProductInFavourites = useProductIsInFavourites(product._id);
  const { addNewSuccessNotification } = useNotification();
  const imgageUrl = `${API_URL}/images/products/${product.photos[0]}`;
  return (
    <div className="max-w-8xl mx-auto flex justify-center  p-4">
      <div className="">
        <div className="py-3">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="flex items-center gap-6">
            <ProductRatingStars
              averageRating={product.averageRating}
              numberOfReviews={product.numberOfReviews}
            />
            <p>Kod: {product._id.slice(0, 6).toLocaleUpperCase()}</p>
          </div>
        </div>
        <div className="flex gap-10">
          <img src={imgageUrl} alt={product.name} className="w-xl h-min" />
          <div className="pr-16 pt-4">
            <p className="text-lg font-semibold">Cechy produktu:</p>
            <ProductFeatures product={product} />
            <p className="mt-8 font-semibold underline">Zobacz opis produktu</p>
          </div>
        </div>
      </div>
      <div className="sticky top-0 flex h-[70vh] flex-col gap-8  px-8 py-8 shadow-lg">
        <ProductPrice price={product.price} salePrice={product.salePrice} />
        <Line />
        <ProductCardFooter product={product} vertical={true} phone={false} />
        <Line />
        <PrimaryButton
          type="button"
          disabled={product.stock === 0}
          onClick={() => {
            dispatch(addProductToCart(product));
            addNewSuccessNotification("Produkt dodano do koszyka");
          }}
        >
          <FaCartPlus className="text-2xl" />
          <span className="text-xl">Do koszyka</span>
        </PrimaryButton>
        <Link
          to="tel:782748757"
          className="flex items-center gap-2 font-semibold"
        >
          <FaPhoneFlip className="text-xl"> </FaPhoneFlip> Zamów telefonicznie
          (782 748 757)
        </Link>
        <Line />
        {isProductInFavourites ? (
          <button
            className="text-md mx-auto flex w-max items-center justify-center  gap-2 transition-all hover:text-red-500"
            onClick={() => {
              dispatch(removeProductFromFavorite(product._id));
            }}
          >
            <FaHeart />
            <span>Usuń z ulubionych</span>
          </button>
        ) : (
          <button
            className="text-md mx-auto flex w-max items-center justify-center  gap-2 transition-all hover:text-red-500"
            onClick={() => {
              dispatch(addProductToFavorite(product));
            }}
          >
            <FaHeart />
            <span>Dodaj do ulubionych</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
