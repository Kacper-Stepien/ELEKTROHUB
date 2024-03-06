require("./models/Category");
require("./models/Product");
require("./models/Review");
require("./models/User");
require("./models/Order");

const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const UserController = require("./controllers/userController");
const CategoryController = require("./controllers/categoryController");
const ProductController = require("./controllers/productController");
const ReviewController = require("./controllers/reviewController");
const OrderController = require("./controllers/orderController");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.static(`${__dirname}/public`));

app.use("/api/users", UserController);
app.use("/api/categories", CategoryController);
app.use("/api/products", ProductController);
app.use("/api/reviews", ReviewController);
app.use("/api/orders", OrderController);

app.use((err, req, res, next) => {
  console.log(`🔴 Error: ${err.message}`);
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

module.exports = app;
