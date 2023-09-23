const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Address = require("./addressSchema");

dotenv.config({ path: "./.env" });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Imię jest wymagane"],
    match: [
      /^[A-Z][a-ząćęłńóśźż]+(\s[A-Z][a-ząćęłńóśźż]+)?$/,
      "Imię musi zaczynać się wielką literą i może zawierać tylko litery, może zawierać drugie imię oddzielone spacją",
    ],
  },
  surname: {
    type: String,
    required: [true, "Nazwisko jest wymagane"],
    match: [
      /^[A-Z][a-ząćęłńóśźż]+(-[A-Z][a-ząćęłńóźż]+)?$/,
      "Nazwisko musi zaczynać się wielką literą i może zawierać tylko litery, może zawierać drugie nazwisko oddzielone myślnikiem",
    ],
  },
  email: {
    type: String,
    required: [true, "Email jest wymagany"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Email jest niepoprawny"],
  },
  password: {
    type: String,
    required: [true, "Hasło jest wymagane"],
    minlength: [8, "Hasło musi mieć minimum 8 znaków"],
    select: false,
  },
  phone: {
    type: String,
    required: [true, "Numer telefonu jest wymagany"],
    match: [
      /^[0-9]{9}$/,
      "Numer telefonu musi składać się z 9 cyfr i nie może zawierać spacji",
    ],
  },
  address: {
    type: Address,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  lastLogin: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, process.env.PASSWORD_SALT);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
