const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  postalCode: {
    type: String,
    match: [
      /^[0-9]{2}-[0-9]{3}$/,
      "Kod pocztowy musi mieć format 00-000 i nie może zawierać spacji",
    ],
  },
  city: {
    type: String,
    match: [
      /^[A-Z][a-ząćęłńóśźż]+$/,
      "Miasto musi zaczynać się wielką literą i może zawierać tylko litery",
    ],
  },
  street: {
    type: String,
    match: [
      /^[A-Z][a-ząćęłńóśźż]+(\s[A-Z][a-ząćęłńóśźż]+)?$/,
      "Ulica musi zaczynać się wielką literą i może zawierać tylko litery, może zawierać drugie imię oddzielone spacją",
    ],
  },
  houseNumber: {
    type: String,
    match: [
      /^[0-9]+[a-zA-Z]?$/,
      "Numer domu musi zaczynać się cyfrą i może zawierać małą lub wielką literę na końcu",
    ],
  },
  apartmentNumber: {
    type: String,
    match: [
      /^[0-9]+[a-zA-Z]?$/,
      "Numer mieszkania musi zaczynać się cyfrą i może zawierać małą lub wielką literę na końcu",
    ],
  },
});

module.exports = addressSchema;
