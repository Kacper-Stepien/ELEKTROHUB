require("./models/Category");
require("./models/Product");
require("./models/Review");
require("./models/User");
require("./models/Order");

const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRoutes");

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

app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/orders", orderRouter);

app.use((err, req, res, next) => {
  console.log(`🔴 Error: ${err.message}`);
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

module.exports = app;
