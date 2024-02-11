import { beforeEach, expect, test } from "vitest";

import { getThemeFromLocalStorage } from "./getThemeFromLocalStorage";

beforeEach(() => {
  localStorage.clear();
});

test('getThemeFromLocalStorage returns "dark" if there is no theme in local storage', () => {
  const theme = getThemeFromLocalStorage();
  expect(theme).toBe("dark");
});

test('getThemeFromLocalStorage returns "dark" if there is an invalid theme in local storage', () => {
  localStorage.setItem("ElektroHub:theme", "invalid");
  const theme = getThemeFromLocalStorage();
  expect(theme).toBe("dark");
});

test('getThemeFromLocalStorage returns "light" if there is a "light" theme in local storage', () => {
  localStorage.setItem("ElektroHub:theme", "light");
  const theme = getThemeFromLocalStorage();
  expect(theme).toBe("light");
});

test('getThemeFromLocalStorage returns "dark" if there is a "dark" theme in local storage', () => {
  localStorage.setItem("ElektroHub:theme", "dark");
  const theme = getThemeFromLocalStorage();
  expect(theme).toBe("dark");
});
