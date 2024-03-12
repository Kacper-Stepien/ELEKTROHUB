import { FC } from "react";
import { CartProduct } from "../../types/CartProduct.interface";
import { CartState } from "../../types/CartState.interface";
import { Product } from "../../types/Product.interface";
import { useAppDispatch } from "../../store/store";
import {
  addProductToCart,
  deleteProductFromCart,
  removeProductFromCart,
} from "../../store/features/cartSlice";
import { formatTotalNumber } from "../../utils/formatTotalNumber";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL as string;

interface CartItemsListProps {
  cart: CartState;
}

const CartItemsList: FC<CartItemsListProps> = ({ cart }) => {
  const dispatch = useAppDispatch();

  const handleIncreaseProductQuantity = (product: Product) => {
    dispatch(addProductToCart(product));
  };

  const handleDecreaseProductQuantity = (product: CartProduct) => {
    if (product.quantity === 1) {
      dispatch(deleteProductFromCart(product.product._id));
    } else {
      dispatch(removeProductFromCart(product.product._id));
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {cart.products.map((product) => (
          <div key={product.product._id} className="flex gap-6">
            <img
              src={`${API_URL}/images/products/${product.product.photos[0]}`}
              alt={product.product.name}
              className="w-16"
            />
            <div className="flex w-full flex-col gap-2">
              <NavLink
                to={`/product/${product.product._id}`}
                className="font-semibold hover:underline"
              >
                {product.product.name}
              </NavLink>
              <div className="flex items-center gap-8">
                <p>
                  {product.product.salePrice
                    ? formatTotalNumber(+product.product.salePrice.toFixed(2))
                    : formatTotalNumber(+product.product.price.toFixed(2))}
                  zł
                </p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm text-white transition-all hover:scale-110 hover:bg-blue-400"
                    onClick={() => handleDecreaseProductQuantity(product)}
                  >
                    <FaMinus />
                  </button>
                  <p>{product.quantity} szt.</p>
                  <button
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm text-white transition-all hover:scale-110 hover:bg-blue-400"
                    onClick={() =>
                      handleIncreaseProductQuantity(product.product)
                    }
                  >
                    <FaPlus />
                  </button>
                </div>
                <p>
                  {formatTotalNumber(+product.totalProductPrice.toFixed(2))} zł
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CartItemsList;
