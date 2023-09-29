const express = require("express");
const reviewController = require("../controllers/reviewController");
const userIsLoggedIn = require("../middlewares/userIsLoggedIn");

const router = express.Router();

router
  .route("/:id")
  .get(reviewController.getReview)
  .put(userIsLoggedIn, reviewController.updateReview)
  .delete(userIsLoggedIn, reviewController.deleteReview);

module.exports = router;
