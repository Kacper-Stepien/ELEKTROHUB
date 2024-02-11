const express = require("express");
const orderController = require("../services/orderService");
const userIsLoggedIn = require("../middlewares/userIsLoggedIn");
const pagination = require("../middlewares/pagination");

const OrderController = express.Router();

OrderController.route("/").post(userIsLoggedIn, orderController.createOrder);

// router.route("/:id").get();

module.exports = OrderController;
