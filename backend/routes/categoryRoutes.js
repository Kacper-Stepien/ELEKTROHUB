const express = require("express");
const authController = require("../controllers/authController");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(
    authController.userIsLoggedIn,
    authController.userIsAdmin,
    categoryController.createCategory
  );

router
  .route("/:id")
  .get(categoryController.getCategory)
  .put(
    authController.userIsLoggedIn,
    authController.userIsAdmin,
    categoryController.updateCategory
  )
  .delete(
    authController.userIsLoggedIn,
    authController.userIsAdmin,
    categoryController.deleteCategory
  );

module.exports = router;
