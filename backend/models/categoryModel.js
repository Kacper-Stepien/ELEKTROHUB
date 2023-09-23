const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nazwa jest wymagana"],
    unique: true,
  },
  description: {
    type: String,
  },
  parentCategory: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
  },
  subCategories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
