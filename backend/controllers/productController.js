const express = require("express");
const productController = require("../services/productService");
const reviewController = require("../services/reviewService");
const userIsLoggedIn = require("../middlewares/userIsLoggedIn");
const userIsAdmin = require("../middlewares/userIsAdmin");
const pagination = require("../middlewares/pagination");
const sorting = require("../middlewares/sorting");
const { resizePhotos } = require("../middlewares/resizePhotos");
const { uploadPhotos } = require("../middlewares/uploadPhotos");

const ProductController = express.Router();

ProductController.route("/")
  .get(pagination, sorting, productController.getAllProducts)
  .post(
    userIsLoggedIn,
    userIsAdmin,
    uploadPhotos,
    resizePhotos,
    productController.createProduct
  );

ProductController.route("/:id")
  .put(userIsLoggedIn, userIsAdmin, productController.updateProduct)
  .delete(userIsLoggedIn, userIsAdmin, productController.deleteProduct);

ProductController.get("/id/:id", productController.getProductById);

ProductController.get("/name/:name", productController.getProductByName);

ProductController.get(
  "/category/:category",
  pagination,
  sorting,
  productController.getProductsByCategory
);

ProductController.route("/:id/reviews")
  .get(reviewController.getReviews)
  .post(userIsLoggedIn, reviewController.createReview);

module.exports = ProductController;
