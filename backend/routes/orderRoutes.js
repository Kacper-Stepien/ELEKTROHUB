const express = require("express");
const orderController = require("../controllers/orderController");
const userIsLoggedIn = require("../middlewares/userIsLoggedIn");
const pagination = require("../middlewares/pagination");

const router = express.Router();

router.route("/").post(userIsLoggedIn, orderController.createOrder);

// router.route("/:id").get();

module.exports = router;
