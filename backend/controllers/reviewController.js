const Review = require("../models/Review");

const catchAsync = require("../utils/catchAsync");

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private and only for users who bought the product
exports.createReview = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user._id;

  const { title, rating, comment } = req.body;

  // Validate data
  if (!title || !rating || !comment) {
    return next(new Error("Proszę podać wszystkie dane"));
  }

  const review = await Review.create({
    title,
    rating,
    comment,
    product: productId,
    user: userId,
  });

  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

// @desc    Get review by id
// @route   GET /api/reviews/:id
// @access  Public
exports.getReview = catchAsync(async (req, res, next) => {
  const reviewId = req.params.id;

  const review = await Review.findById(reviewId).populate("user");

  if (!review) {
    res.status(404).json({
      status: "error",
      message: "Nie znaleziono recenzji",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

// @desc    Get all reviews for a product
// @route   GET /api/products/:id/reviews
// @access  Public
exports.getReviews = catchAsync(async (req, res, next) => {
  const productId = req.params.id;

  const reviews = await Review.find({ product: productId }).populate("user");

  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private and only for the user who created the review
exports.updateReview = catchAsync(async (req, res, next) => {
  const reviewId = req.params.id;
  const userId = req.user._id;

  const { title, rating, comment } = req.body;

  // Validate data
  if (!title || !rating || !comment) {
    return res.status(400).json({
      status: "error",
      message: "Proszę podać wszystkie dane",
    });
  }

  // Check if review exists
  const review = await Review.findById(reviewId).populate("user");
  if (!review) {
    return res.status(404).json({
      status: "error",
      message: "Nie znaleziono recenzji",
    });
  }

  // Check if user is the owner of the review
  if (review.user.toString() !== userId) {
    return res.status(403).json({
      status: "error",
      message: "Nie masz uprawnień do edycji tej recenzji",
    });
  }

  // Update review
  review.title = title;
  review.rating = rating;
  review.comment = comment;
  await review.save();

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private and only for the user who created the review
exports.deleteReview = catchAsync(async (req, res, next) => {
  const reviewId = req.params.id;
  const userId = req.user._id;

  // Check if review exists
  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({
      status: "error",
      message: "Nie znaleziono recenzji",
    });
  }

  // Check if user is the owner of the review
  if (review.user.toString() !== userId) {
    return res.status(403).json({
      status: "error",
      message: "Nie masz uprawnień do usunięcia tej recenzji",
    });
  }

  await review.remove();

  res.status(204).json({
    status: "success",
    data: null,
  });
});
