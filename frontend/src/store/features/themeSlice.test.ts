import { expect, test } from "vitest";
import themeSlice, { setThemeDark, setThemeLight } from "./themeSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
});

test("setThemeDark action updates theme state correctly", () => {
  store.dispatch(setThemeDark());
  const { theme } = store.getState().theme;
  expect(theme).toEqual("dark");
});

test("setThemeLight action updates theme state correctly", () => {
  store.dispatch(setThemeLight());
  const { theme } = store.getState().theme;
  expect(theme).toEqual("light");
});

test("ElektroHub:theme is equal dark -> default theme state is dark", () => {
  localStorage.setItem("ElektroHub:theme", "dark");
  setTimeout(() => {
    const store = configureStore({
      reducer: {
        theme: themeSlice,
      },
    });
    const { theme } = store.getState().theme;
    expect(theme).toEqual("dark");
  }, 100);
});

test("ElektroHub:theme is equal light -> default theme state is light", () => {
  localStorage.setItem("ElektroHub:theme", "light");
  setTimeout(() => {
    const store = configureStore({
      reducer: {
        theme: themeSlice,
      },
    });
    const { theme } = store.getState().theme;
    expect(theme).toEqual("light");
  }, 100);
});

test("ElektroHub:theme is not equal dark or light -> default theme state is dark", () => {
  localStorage.setItem("ElektroHub:theme", "not-dark-not-light");
  setTimeout(() => {
    const store = configureStore({
      reducer: {
        theme: themeSlice,
      },
    });
    const { theme } = store.getState().theme;
    expect(theme).toEqual("dark");
  }, 100);
});
