const mongoose = require("mongoose");
const Product = require("./Product");
const User = require("./User");
const Order = require("./Order");

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "Produkt jest wymagany"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Użytkownik jest wymagany"],
  },
  rating: {
    type: Number,
    required: [true, "Ocena jest wymagana"],
    min: [1, "Ocena nie może być mniejsza niż 1"],
    max: [5, "Ocena nie może być większa niż 5"],
  },
  comment: {
    type: String,
    required: [true, "Komentarz jest wymagany"],
  },
});

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre("save", async function (next) {
  // Check if product exists
  const product = await Product.findById(this.product);
  if (!product) {
    return next(new Error("Produkt nie istnieje"));
  }

  // Check if user has purchased product
  const user = await User.findById(this.user);
  if (!user) {
    return next(new Error("Użytkownik nie istnieje"));
  }

  // Check if user has purchased product
  const order = await Order.findOne({
    customer: user._id,
    "items.product": product._id,
  });

  if (!order) {
    return next(new Error("Aby ocenić produkt musisz go najpierw kupić"));
  }

  next();
});

reviewSchema.post("save", async function () {
  await updateProductStats(this.product);
});

reviewSchema.post("remove", async function () {
  await updateProductStats(this.product);
});

const updateProductStats = async (productId) => {
  const stats = await Review.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        numberOfReviews: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      averageRating: stats[0].averageRating,
      numberOfReviews: stats[0].numberOfReviews,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      averageRating: 0,
      numberOfReviews: 0,
    });
  }
};

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
