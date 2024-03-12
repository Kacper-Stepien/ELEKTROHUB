import { beforeEach, expect, test } from "vitest";

import cartSlice, {
  addProductToCart,
  clearCart,
  deleteProductFromCart,
  removeProductFromCart,
  getProductPrice,
  calculateTotalProductPrice,
} from "./cartSlice";

import { configureStore } from "@reduxjs/toolkit";
import { Product } from "../../types/Product.interface";

const store = configureStore({
  reducer: {
    cart: cartSlice,
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

describe("cartSlice", () => {
  beforeEach(() => {
    store.dispatch(clearCart());
  });

  test("addProductToCart action adds product to cart correctly when there is no product in the cart yet", () => {
    store.dispatch(addProductToCart(product1));
    const state = store.getState().cart;
    expect(state.products.length).toBe(1);
    expect(state.products[0].product).toEqual(product1);
    expect(state.products[0].product.name).toBe("Laptop");
  });

  test("addProductToCart action adds product to cart correctly when there is already a product in the cart", () => {
    store.dispatch(addProductToCart(product1));
    store.dispatch(addProductToCart(product1));
    const state = store.getState().cart;
    expect(state.products.length).toBe(1);
    expect(state.products[0].quantity).toBe(2);
    expect(state.products[0].totalProductPrice).toBe(9000);
  });

  test("addProductToCart action adds product to cart with correct total price when the product is on sale", () => {
    store.dispatch(addProductToCart(product2));
    const state = store.getState().cart;
    expect(state.products.length).toBe(1);
    expect(state.totalPrice).toBe(2100);
  });

  test("removeProductFromCart action removes product from cart correctly when there is only one product in the cart", () => {
    store.dispatch(addProductToCart(product1));
    store.dispatch(removeProductFromCart("1"));
    const state = store.getState().cart;
    expect(state.products.length).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

  test("removeProductFromCart action removes product from cart correctly when there is more than one product in the cart", () => {
    store.dispatch(addProductToCart(product1));
    store.dispatch(addProductToCart(product1));
    store.dispatch(removeProductFromCart("1"));
    const state = store.getState().cart;
    expect(state.products.length).toBe(1);
    expect(state.products[0].quantity).toBe(1);
    expect(state.products[0].totalProductPrice).toBe(4500);
  });

  test("removeProductFromCart action does nothing when there is no product with given id in the cart", () => {
    store.dispatch(addProductToCart(product1));
    store.dispatch(removeProductFromCart("2"));
    const state = store.getState().cart;
    expect(state.products.length).toBe(1);
    expect(state.products[0].product).toEqual(product1);
  });

  test("deleteProductFromCart action deletes product from cart correctly", () => {
    store.dispatch(addProductToCart(product1));
    store.dispatch(addProductToCart(product1));
    store.dispatch(addProductToCart(product1));
    store.dispatch(deleteProductFromCart("1"));
    const state = store.getState().cart;
    expect(state.products.length).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

  test("deleteProductFromCart action does nothing when there is no product with given id in the cart", () => {
    store.dispatch(addProductToCart(product1));
    store.dispatch(deleteProductFromCart("2"));
    const state = store.getState().cart;
    expect(state.products.length).toBe(1);
    expect(state.products[0].product).toEqual(product1);
  });

  test("clearCart action clears cart correctly", () => {
    store.dispatch(addProductToCart(product1));
    store.dispatch(addProductToCart(product1));
    store.dispatch(addProductToCart(product2));
    store.dispatch(clearCart());
    const state = store.getState().cart;
    expect(state.products.length).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

  test("getProductPrice function returns correct price when the product is on sale", () => {
    const price = getProductPrice(product2);
    expect(price).toBe(2100);
  });

  test("getProductPrice function returns correct price when the product is not on sale", () => {
    const price = getProductPrice(product1);
    expect(price).toBe(4500);
  });

  test("calculateTotalProductPrice function returns correct total product price", () => {
    const product = {
      product: product1,
      quantity: 3,
      totalProductPrice: 13500,
    };
    const totalProductPrice = calculateTotalProductPrice(product);
    expect(totalProductPrice).toBe(13500);
  });

  test("calculateTotalProductPrice function returns 0 when the quantity is 0", () => {
    const product = {
      product: product1,
      quantity: 0,
      totalProductPrice: 0,
    };
    const totalProductPrice = calculateTotalProductPrice(product);
    expect(totalProductPrice).toBe(0);
  });

  test("calculateTotalProductPrice function returns correct total product price when the quantity is 1", () => {
    const product = {
      product: product1,
      quantity: 1,
      totalProductPrice: 4500,
    };
    const totalProductPrice = calculateTotalProductPrice(product);
    expect(totalProductPrice).toBe(4500);
  });
});
