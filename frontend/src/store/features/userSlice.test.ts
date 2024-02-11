import { beforeEach, expect, test } from "vitest";
import userSlice, {
  clearUser,
  setAddress,
  setUser,
  updateUser,
} from "./userSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

beforeEach(() => {
  store.dispatch(clearUser());
});

test("setUser action updates user state correctly", () => {
  const user = {
    _id: "123",
    name: "John",
    surname: "Doe",
    email: "john@example.com",
    phone: "123456789",
    isAdmin: true,
    createdAt: new Date(),
    address: {
      postalCode: "12345",
      city: "City",
      street: "Street",
      houseNumber: "1",
      apartmentNumber: "2",
    },
  };

  store.dispatch(setUser(user));

  const state = store.getState().user;

  expect(state).toEqual(user);
});

test("updateUser action get some parameters and updates user state correctly", () => {
  const user = {
    _id: "123",
    name: "John",
    surname: "Doe",
    email: "john@example.com",
    phone: "123456789",
    isAdmin: false,
    createdAt: undefined,
  };

  store.dispatch(setUser(user));

  const updatedUser = {
    name: "Jane",
    phone: "987654321",
    isAdmin: true,
  };

  store.dispatch(updateUser(updatedUser));

  const state = store.getState().user;
  expect(state).toEqual({
    _id: "123",
    name: "Jane",
    surname: "Doe",
    email: "john@example.com",
    phone: "987654321",
    isAdmin: false,
    createdAt: undefined,
  });
});

test("updateUser action get empty object and updates user state correctly", () => {
  const user = {
    _id: "123",
    name: "John",
    surname: "Doe",
    email: "john@example.com",
    phone: "123456789",
    isAdmin: false,
    createdAt: undefined,
  };

  store.dispatch(setUser(user));

  const updatedUser = {};

  store.dispatch(updateUser(updatedUser));

  const state = store.getState().user;
  expect(state).toEqual(user);
});

test("clearUser action resets user state to initial state", () => {
  store.dispatch(
    setUser({
      _id: "123",
      name: "John",
      surname: "Doe",
      email: "john@example.com",
      phone: "123456789",
      isAdmin: true,
      createdAt: new Date(),
      address: {
        postalCode: "12345",
        city: "City",
        street: "Street",
        houseNumber: "1",
        apartmentNumber: "2",
      },
    })
  );

  store.dispatch(clearUser());

  const state = store.getState().user;

  expect(state).toEqual({
    _id: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    isAdmin: false,
    createdAt: undefined,
    address: undefined,
  });
});

test("setAddress action updates address correctly when address was undefined", () => {
  const address = {
    postalCode: "54321",
    city: "New City",
    street: "New Street",
    houseNumber: "10",
    apartmentNumber: "20",
  };

  store.dispatch(setAddress(address));

  const state = store.getState().user;

  expect(state.address).toEqual(address);
});

test("setAddress action updates address correctly when address was defined", () => {
  const user = {
    _id: "123",
    name: "John",
    surname: "Doe",
    email: "john@example.com",
    phone: "123456789",
    isAdmin: true,
    createdAt: new Date(),
    address: {
      postalCode: "12345",
      city: "City",
      street: "Street",
      houseNumber: "1",
      apartmentNumber: "2",
    },
  };
  store.dispatch(setUser(user));

  const newAddress = {
    postalCode: "54321",
    city: "New City",
    street: "New Street",
    houseNumber: "10",
    apartmentNumber: "20",
  };

  store.dispatch(setAddress(newAddress));

  const state = store.getState().user;

  expect(state.address).toEqual(newAddress);
});
