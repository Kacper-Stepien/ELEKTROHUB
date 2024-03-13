import { beforeEach, expect, test } from "vitest";
import favouriteProductsSlice, {
  addProductToFavorite,
  removeProductFromFavorite,
  clearFavouriteProducts,
} from "./favouriteProductsSlice";

import { configureStore } from "@reduxjs/toolkit";
import { Product } from "../../types/Product.interface";

const store = configureStore({
  reducer: {
    favouriteProducts: favouriteProductsSlice,
  },
});

const product1: Product = {
  _id: "1",
  name: "Laptop",
  category: "Electronics",
  description: "super laptop",
  price: 4500,
  salePrice: null,
  stock: 10,
  onSale: false,
  averageRating: 4.5,
  numberOfReviews: 10,
  attributes: [
    {
      name: "color",
      value: "black",
    },
  ],
  photos: ["laptop.jpg"],
};

const product2: Product = {
  _id: "2",
  name: "Phone",
  category: "Electronics",
  description: "super phone",
  price: 3000,
  salePrice: 2100,
  stock: 10,
  onSale: true,
  averageRating: 4.9,
  numberOfReviews: 15,
  attributes: [
    {
      name: "color",
      value: "black",
    },
  ],
  photos: ["phone.jpg"],
};

describe("favouriteProductsSlice", () => {
  beforeEach(() => {
    store.dispatch(clearFavouriteProducts());
  });

  test("addProductToFavourite action adds product to favourite products correctly when there is no product in the favourite products yet", () => {
    store.dispatch(addProductToFavorite(product1));
    const state = store.getState();
    expect(state.favouriteProducts.products).toEqual([product1]);
    expect(state.favouriteProducts.products.length).toBe(1);
  });

  test("addProductToFavourite action does not add the same product to favourite products again", () => {
    store.dispatch(addProductToFavorite(product1));
    store.dispatch(addProductToFavorite(product1));
    const state = store.getState();
    expect(state.favouriteProducts.products).toEqual([product1]);
    expect(state.favouriteProducts.products.length).toBe(1);
  });

  test("removeProductFromFavourite action removes product from favourite products correctly", () => {
    store.dispatch(addProductToFavorite(product1));
    store.dispatch(addProductToFavorite(product2));
    store.dispatch(removeProductFromFavorite(product1._id));
    const state = store.getState();
    expect(state.favouriteProducts.products).toEqual([product2]);
    expect(state.favouriteProducts.products.length).toBe(1);
  });

  test("clearFavouriteProducts action clears favourite products correctly", () => {
    store.dispatch(addProductToFavorite(product1));
    store.dispatch(addProductToFavorite(product2));
    store.dispatch(clearFavouriteProducts());
    const state = store.getState();
    expect(state.favouriteProducts.products).toEqual([]);
    expect(state.favouriteProducts.products.length).toBe(0);
  });
});
