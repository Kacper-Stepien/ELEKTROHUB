import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Product.interface";

interface FavouriteProductsState {
  products: Product[];
}

const initialState: FavouriteProductsState = {
  products: [],
};

const favouriteProductsSlice = createSlice({
  name: "favouriteProducts",
  initialState,
  reducers: {
    addProductToFavorite(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existingProduct = state.products.find(
        (item) => item._id === product._id,
      );
      if (!existingProduct) {
        state.products.push(product);
      }
    },
    removeProductFromFavorite(state, action: PayloadAction<string>) {
      const productId = action.payload;
      state.products = state.products.filter((item) => item._id !== productId);
    },
    clearFavouriteProducts(state) {
      state.products = [];
    },
  },
});

export const {
  addProductToFavorite,
  removeProductFromFavorite,
  clearFavouriteProducts,
} = favouriteProductsSlice.actions;
export default favouriteProductsSlice.reducer;
