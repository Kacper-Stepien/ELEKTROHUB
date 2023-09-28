const catchAsync = require("../utils/catchAsync");

userIsAdmin = catchAsync(async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      status: "error",
      message: "Nie masz uprawnień do wykonania tej operacji",
    });
  }
  next();
});

module.exports = userIsAdmin;
