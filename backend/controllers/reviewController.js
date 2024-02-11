const express = require("express");
const reviewController = require("../services/reviewService");
const userIsLoggedIn = require("../middlewares/userIsLoggedIn");

const ReviewController = express.Router();

ReviewController.route("/:id")
  .get(reviewController.getReview)
  .put(userIsLoggedIn, reviewController.updateReview)
  .delete(userIsLoggedIn, reviewController.deleteReview);

module.exports = ReviewController;
