import { FC } from "react";
import { Product } from "../../types/Product.interface";
import { NavLink } from "react-router-dom";
import { formatTotalNumber } from "../../utils/formatTotalNumber";
import { useAppDispatch } from "../../store/store";
import { removeProductFromFavorite } from "../../store/features/favouriteProductsSlice";

const API_URL = import.meta.env.VITE_API_URL as string;

interface ProductsListProps {
  products: Product[];
}

const ProductsList: FC<ProductsListProps> = ({ products }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-2">
      {products.map((product) => (
        <div key={product._id} className="flex gap-6">
          <img
            src={`${API_URL}/images/products/${product.photos[0]}`}
            alt={product.name}
            className="w-16"
          />
          <div className="flex w-full flex-col gap-2">
            <NavLink
              to={`/product/${product._id}`}
              className="font-semibold hover:underline"
            >
              {product.name}
            </NavLink>
            <div className="flex items-center gap-8">
              <p>
                {product.salePrice
                  ? formatTotalNumber(+product.salePrice.toFixed(2))
                  : formatTotalNumber(+product.price.toFixed(2))}
                zł
              </p>
              <button
                className="flex items-center justify-center rounded-full bg-blue-500 px-2 py-1 text-sm text-white transition-all hover:scale-110 hover:bg-blue-400"
                onClick={() => {
                  dispatch(removeProductFromFavorite(product._id));
                }}
              >
                Usuń z ulubionych
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
