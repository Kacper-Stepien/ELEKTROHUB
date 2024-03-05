const mongoose = require("mongoose");
const Category = require("./Category");
const Review = require("./Review");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nazwa jest wymagana"],
    unique: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "Kategoria jest wymagana"],
  },
  description: {
    type: String,
    required: [true, "Opis jest wymagany"],
  },
  attributes: [
    {
      name: String,
      value: String,
    },
  ],
  price: {
    type: Number,
    required: [true, "Cena jest wymagana"],
    min: [0, "Cena nie może być ujemna"],
  },
  salePrice: {
    type: Number,
    min: [0, "Cena nie może być ujemna"],
    validate: {
      validator: function (value) {
        if (value === null) return true;
        return value <= this.price;
      },
      message: "Cena promocyjna nie może być większa od ceny podstawowej",
    },
    default: null,
  },
  stock: {
    type: Number,
    required: [true, "Ilość jest wymagana"],
  },
  onSale: {
    type: Boolean,
    default: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  images: {
    type: [String],
    required: [true, "Produkt musi mieć przynamniej jedno zdjęcie"],
  },
});

productSchema.pre("save", async function (next) {
  const category = await Category.findById(this.category);
  if (!category) {
    return next(new Error("Kategoria nie istnieje"));
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
