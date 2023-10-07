const mongoose = require("mongoose");
const Order = require("../models/Order");
const catchAsync = require("../utils/catchAsync");

// @desc     Create new order
// @route    POST /api/orders
// @access   Private
exports.createOrder = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const { items, paymentMethod, address } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create order
    const order = await Order.create(
      [{ items, paymentMethod, address, customer: userId }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(`🔴 Error: ${error.message}`);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});
