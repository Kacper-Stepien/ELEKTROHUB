const express = require("express");
const productController = require("../controllers/productController");
const reviewController = require("../controllers/reviewController");
const userIsLoggedIn = require("../middlewares/userIsLoggedIn");
const userIsAdmin = require("../middlewares/userIsAdmin");
const pagination = require("../middlewares/pagination");
const sorting = require("../middlewares/sorting");

const router = express.Router();

router
  .route("/")
  .get(pagination, sorting, productController.getAllProducts)
  .post(userIsLoggedIn, userIsAdmin, productController.createProduct);

router
  .route("/:id")
  .put(userIsLoggedIn, userIsAdmin, productController.updateProduct)
  .delete(userIsLoggedIn, userIsAdmin, productController.deleteProduct);

router.get("/id/:id", productController.getProductById);

router.get("/name/:name", productController.getProductByName);

router.get(
  "/category/:category",
  pagination,
  sorting,
  productController.getProductsByCategory
);

router
  .route("/:id/reviews")
  .get(reviewController.getReviews)
  .post(userIsLoggedIn, reviewController.createReview);

module.exports = router;
