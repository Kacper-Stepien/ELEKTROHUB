const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  console.log(`🔴 Error: ${err.message}`);
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

module.exports = app;
