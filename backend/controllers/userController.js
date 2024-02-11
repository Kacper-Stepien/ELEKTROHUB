const express = require("express");
const userController = require("../services/userService");
const userIsLoggedIn = require("../middlewares/userIsLoggedIn");
const userIsAdmin = require("../middlewares/userIsAdmin");

const UserController = express.Router();

UserController.post("/register", userController.register);

UserController.post("/login", userController.login);

UserController.post("/logout", userIsLoggedIn, userController.logout);

UserController.route("/me")
  .get(userIsLoggedIn, userController.me)
  .put(userIsLoggedIn, userController.updateMe)
  .delete(userIsLoggedIn, userController.deleteMe);

UserController.get(
  "/",
  userIsLoggedIn,
  userIsAdmin,
  userController.getAllUsers
);

UserController.route("/:id")
  .get(userIsLoggedIn, userIsAdmin, userController.getUser)
  .put(userIsLoggedIn, userIsAdmin, userController.updateUser)
  .delete(userIsLoggedIn, userIsAdmin, userController.deleteUser);

module.exports = UserController;
