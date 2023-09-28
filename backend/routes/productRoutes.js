const express = require("express");
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authController.userIsLoggedIn,
    authController.userIsAdmin,
    productController.createProduct
  );

router
  .route("/:id")
  .put(
    authController.userIsLoggedIn,
    authController.userIsAdmin,
    productController.updateProduct
  )
  .delete(
    authController.userIsLoggedIn,
    authController.userIsAdmin,
    productController.deleteProduct
  );

router.get("/id/:id", productController.getProductById);
router.get("/name/:name", productController.getProductByName);

module.exports = router;
