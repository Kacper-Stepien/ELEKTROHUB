const catchAsync = require("../utils/catchAsync");

const userHasPurchasedProduct = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const productId = req.body.product;

  // Check if user has purchased product
  const order = await Order.findOne({
    customer: userId,
    "items.product": productId,
  });

  if (!order) {
    return res.status(403).json({
      status: "error",
      message: "Aby ocenić produkt musisz go najpierw kupić",
    });
  }

  next();
});

module.exports = userHasPurchasedProduct;
