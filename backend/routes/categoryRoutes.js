const express = require("express");
const categoryController = require("../controllers/categoryController");
const userIsLoggedIn = require("../middlewares/userIsLoggedIn");
const userIsAdmin = require("../middlewares/userIsAdmin");

const router = express.Router();

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(userIsLoggedIn, userIsAdmin, categoryController.createCategory);

router
  .route("/:id")
  .get(categoryController.getCategory)
  .put(userIsLoggedIn, userIsAdmin, categoryController.updateCategory)
  .delete(userIsLoggedIn, userIsAdmin, categoryController.deleteCategory);

module.exports = router;
