const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

exports.userIsLoggedIn = catchAsync(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Nie jesteś zalogowany",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({
      status: "error",
      message: "Nie jesteś zalogowany",
    });
  }

  req.user = await User.findById(decoded.id);
  next();
});

exports.userIsAdmin = catchAsync(async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      status: "error",
      message: "Nie masz uprawnień do wykonania tej operacji",
    });
  }
  next();
});
