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

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);

app.use((err, req, res, next) => {
  console.log(`🔴 Error: ${err.message}`);
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

module.exports = app;
