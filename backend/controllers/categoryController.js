const express = require("express");
const categoryController = require("../services/categoryService");
const userIsLoggedIn = require("../middlewares/userIsLoggedIn");
const userIsAdmin = require("../middlewares/userIsAdmin");

const CategoryController = express.Router();

CategoryController.route("/")
  .get(categoryController.getAllCategories)
  .post(userIsLoggedIn, userIsAdmin, categoryController.createCategory);

CategoryController.route("/:id")
  .get(categoryController.getCategory)
  .put(userIsLoggedIn, userIsAdmin, categoryController.updateCategory)
  .delete(userIsLoggedIn, userIsAdmin, categoryController.deleteCategory);

module.exports = CategoryController;
