import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartState } from "../../types/CartState.interface";
import { Product } from "../../types/Product.interface";
import { CartProduct } from "../../types/CartProduct.interface";

const initialState: CartState = {
  products: [],
  totalPrice: 0,
};

const getProductPrice = (product: Product): number => {
  return product.salePrice ? product.salePrice : product.price;
};

const calculateTotalProductPrice = (cartProduct: CartProduct): number => {
  const price = cartProduct.product.salePrice
    ? cartProduct.product.salePrice
    : cartProduct.product.price;
  return price * cartProduct.quantity;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existingProduct = state.products.find(
        (item) => item.product._id === product._id,
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalProductPrice =
          existingProduct.quantity * getProductPrice(product);
      } else {
        const price = getProductPrice(product);
        state.products.push({
          product,
          quantity: 1,
          totalProductPrice: price,
        });
      }
      state.totalPrice += getProductPrice(product);
    },
    removeProductFromCart(state, action: PayloadAction<string>) {
      const productId = action.payload;
      const existingProduct = state.products.find(
        (item) => item.product._id === productId,
      );
      if (existingProduct) {
        if (existingProduct.quantity === 1) {
          state.products = state.products.filter(
            (item) => item.product._id !== productId,
          );
        } else {
          existingProduct.quantity -= 1;
          existingProduct.totalProductPrice -= getProductPrice(
            existingProduct.product,
          );
        }
        state.totalPrice -= calculateTotalProductPrice(existingProduct);
      }
    },
    deleteProductFromCart(state, action: PayloadAction<string>) {
      const productId = action.payload;
      const existingProduct = state.products.find(
        (item) => item.product._id === productId,
      );
      if (existingProduct) {
        state.products = state.products.filter(
          (item) => item.product._id !== productId,
        );
        state.totalPrice -= existingProduct.totalProductPrice;
      }
    },
    clearCart(state) {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  deleteProductFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
