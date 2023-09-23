const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/logout", authController.userIsLoggedIn, userController.logout);

router
  .route("/me")
  .get(authController.userIsLoggedIn, userController.me)
  .put(authController.userIsLoggedIn, userController.updateMe)
  .delete(authController.userIsLoggedIn, userController.deleteMe);

router.get(
  "/",
  authController.userIsLoggedIn,
  authController.userIsAdmin,
  userController.getAllUsers
);

router
  .route("/:id")
  .get(
    authController.userIsLoggedIn,
    authController.userIsAdmin,
    userController.getUser
  )
  .put(
    authController.userIsLoggedIn,
    authController.userIsAdmin,
    userController.updateUser
  )
  .delete(
    authController.userIsLoggedIn,
    authController.userIsAdmin,
    userController.deleteUser
  );

module.exports = router;
