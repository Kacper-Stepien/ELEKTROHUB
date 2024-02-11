import { expect, test } from "vitest";

import Validator from "./Validator";

test("argument is empty string -> Validator.isEmpty return true", () => {
  expect(Validator.isEmpty("")).toBe(true);
});

test("argument is not empty string -> Validator.isEmpty return false", () => {
  expect(Validator.isEmpty("not empty")).toBe(false);
});

test("argument is valid email -> Validator.isEmail return true", () => {
  expect(Validator.isEmail("kacper@gmail.com")).toBe(true);
  expect(Validator.isEmail("k@g.c")).toBe(true);
  expect(Validator.isEmail("1@1.1")).toBe(true);
});

test("argument is not email -> Validator.isEmail return false", () => {
  expect(Validator.isEmail("kacpergmail.com")).toBe(false);
  expect(Validator.isEmail("xxxxxx@xxxxxxxx")).toBe(false);
  expect(Validator.isEmail("kacper@.com")).toBe(false);
  expect(Validator.isEmail("xxxxxx@xxx")).toBe(false);
});

test("argument is valid nick -> Validator.isNick return true", () => {
  expect(Validator.isNick("kacper123")).toBe(true);
  expect(Validator.isNick("kacper")).toBe(true);
});

test("argument is 5 characters long nick -> Validator.isNick return true", () => {
  expect(Validator.isNick("kacpe")).toBe(true);
});

test("argument is 25 characters long nick -> Validator.isNick return true", () => {
  expect(Validator.isNick("kacper1234567890123456789")).toBe(true);
});

test("argument is < 5 characters long nick -> Validator.isNick return false", () => {
  expect(Validator.isNick("kacp")).toBe(false);
  expect(Validator.isNick("kac1")).toBe(false);
});

test("argument is > 25 characters long nick -> Validator.isNick return false", () => {
  expect(Validator.isNick("kacper12345678901234567890")).toBe(false);
});

test("argument contain special characters -> Validator.isNick return false", () => {
  expect(Validator.isNick("xxas3xxxxx@x")).toBe(false);
  expect(Validator.isNick("xxxxxxx!x")).toBe(false);
  expect(Validator.isNick("xxxxxxx#x")).toBe(false);
});

test("argument contain capital letters -> Validator.isNick return false", () => {
  expect(Validator.isNick("Kacper")).toBe(false);
  expect(Validator.isNick("Kacper123")).toBe(false);
});

test("argument is >= 8 character long -> Validator.isPassword return true", () => {
  expect(Validator.isPassword("kacper1234")).toBe(true);
  expect(Validator.isPassword("Hasło12345!")).toBe(true);
});

test("argument is < 8 character long -> Validator.isPassword return false", () => {
  expect(Validator.isPassword("kacper")).toBe(false);
  expect(Validator.isPassword("Hasło1!")).toBe(false);
});

test("argument is equal to password -> Validator.isPasswordConfirm return true", () => {
  expect(Validator.isPasswordConfirm("kacper1234", "kacper1234")).toBe(true);
  expect(Validator.isPasswordConfirm("Hasło12345!", "Hasło12345!")).toBe(true);
});

test("argument is not equal to password -> Validator.isPasswordConfirm return false", () => {
  expect(Validator.isPasswordConfirm("kacper1234", "kacper12345")).toBe(false);
  expect(Validator.isPasswordConfirm("Hasło12345!", "Hasło12345")).toBe(false);
});

test("argument is empty string -> Validator.isName return false", () => {
  expect(Validator.isName("")).toBe(false);
});

test("argument starts with capital letter -> Validator.isName return true", () => {
  expect(Validator.isName("Kacper")).toBe(true);
  expect(Validator.isName("Vi")).toBe(true);
});

test("argument contain two words separated with space - both words starts with capital letter -> Validator.isName return true", () => {
  expect(Validator.isName("Kacper Jan")).toBe(true);
  expect(Validator.isName("Vi Jan")).toBe(true);
});

test("argument contain two words separated with space - first word starts with capital letter, second word starts with small letter -> Validator.isName return false", () => {
  expect(Validator.isName("Kacper jan")).toBe(false);
  expect(Validator.isName("Vi jan")).toBe(false);
});

test("argument contain two words separated with space - both words starts with small letter -> Validator.isName return false", () => {
  expect(Validator.isName("kacper jan")).toBe(false);
  expect(Validator.isName("vi jan")).toBe(false);
});

test("argument contain two words separated with space - first word starts with small letter, second word starts with capital letter -> Validator.isName return false", () => {
  expect(Validator.isName("kacper Jan")).toBe(false);
  expect(Validator.isName("vi Jan")).toBe(false);
});

test("argument contain one word and contain > 20 characters  -> Validator.isName return false", () => {
  expect(Validator.isName("Kacperqwertykacperqwerty")).toBe(false);
  expect(Validator.isName("Viqwertyviqwertypomkkk")).toBe(false);
});

test("argument contain two words and contain > 40 characters  -> Validator.isName return false", () => {
  expect(
    Validator.isName(
      "Kacperqwertykacperqwertyldkogdg Kacperqwertykacperqwertyldkogdg"
    )
  ).toBe(false);
  expect(
    Validator.isName("Viqwertyviqwertyldkogdg Viqwertyviqwertyldkogdg")
  ).toBe(false);
});

test("argument is empty string -> Validator.isSurname return false", () => {
  expect(Validator.isSurname("")).toBe(false);
});

test("argument starts with capital letter -> Validator.isSurname return true", () => {
  expect(Validator.isSurname("Stepien")).toBe(true);
  expect(Validator.isSurname("Vi")).toBe(true);
});

test("argument contain two words separated with dash - both words starts with capital letter -> Validator.isSurname return true", () => {
  expect(Validator.isSurname("Stepien-Nowak")).toBe(true);
  expect(Validator.isSurname("Vi-Nowak")).toBe(true);
});

test("argument contain two words separated with dash - first word starts with capital letter, second word starts with small letter -> Validator.isSurname return false", () => {
  expect(Validator.isSurname("Stepien-nowak")).toBe(false);
  expect(Validator.isSurname("Vi-nowak")).toBe(false);
});

test("argument contain two words separated with dash - both words starts with small letter -> Validator.isSurname return false", () => {
  expect(Validator.isSurname("stepien-nowak")).toBe(false);
  expect(Validator.isSurname("vi-nowak")).toBe(false);
});

test("argument contain two words separated with dash - first word starts with small letter, second word starts with capital letter -> Validator.isSurname return false", () => {
  expect(Validator.isSurname("stepien-Nowak")).toBe(false);
  expect(Validator.isSurname("vi-Nowak")).toBe(false);
});

test("argument contain one word and contain > 20 characters  -> Validator.isSurname return false", () => {
  expect(Validator.isSurname("Stepienqwertykacperqwerty")).toBe(false);
  expect(Validator.isSurname("Viqwertyviqwertypomkkk")).toBe(false);
});

test("argument contain two words and contain > 40 characters  -> Validator.isSurname return false", () => {
  expect(
    Validator.isSurname(
      "Stepienqwertykacperqwertyldkogdg-Stepienqwertykacperqwertyldkogdg"
    )
  ).toBe(false);
  expect(
    Validator.isSurname("Viqwertyviqwertyldkogdg-Viqwertyviqwertyldkogdg")
  ).toBe(false);
});

test("argument is valid phone number -> Validator.isPhone return true", () => {
  expect(Validator.isPhone("123456789")).toBe(true);
  expect(Validator.isPhone("987654321")).toBe(true);
});

test("argument is not valid phone number -> Validator.isPhone return false", () => {
  expect(Validator.isPhone("12345678")).toBe(false);
  expect(Validator.isPhone("9876543210")).toBe(false);
});
