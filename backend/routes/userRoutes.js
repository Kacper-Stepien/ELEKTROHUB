const express = require("express");
const userController = require("../controllers/userController");
const userIsLoggedIn = require("../middlewares/userIsLoggedIn");
const userIsAdmin = require("../middlewares/userIsAdmin");

const router = express.Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/logout", userIsLoggedIn, userController.logout);

router
  .route("/me")
  .get(userIsLoggedIn, userController.me)
  .put(userIsLoggedIn, userController.updateMe)
  .delete(userIsLoggedIn, userController.deleteMe);

router.get("/", userIsLoggedIn, userIsAdmin, userController.getAllUsers);

router
  .route("/:id")
  .get(userIsLoggedIn, userIsAdmin, userController.getUser)
  .put(userIsLoggedIn, userIsAdmin, userController.updateUser)
  .delete(userIsLoggedIn, userIsAdmin, userController.deleteUser);

module.exports = router;
