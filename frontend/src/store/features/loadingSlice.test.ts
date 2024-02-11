import { beforeEach, expect, test } from "vitest";
import loadingSlice, { startLoading, stopLoading } from "./loadingSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    loading: loadingSlice,
  },
});

beforeEach(() => {
  store.dispatch(stopLoading());
});

test("default loading state is false", () => {
  const state = store.getState().loading;

  expect(state.loading).toBe(false);
});

test("startLoading action sets loading state to true", () => {
  store.dispatch(startLoading());
  const state = store.getState().loading;
  expect(state.loading).toBe(true);
});

test("stopLoading action sets loading state to false", () => {
  store.dispatch(startLoading());
  store.dispatch(stopLoading());
  const state = store.getState().loading;
  expect(state.loading).toBe(false);
});
