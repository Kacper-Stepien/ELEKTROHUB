const express = require("express");
const productController = require("../controllers/productController");
const userIsLoggedIn = require("../middlewares/userIsLoggedIn");
const userIsAdmin = require("../middlewares/userIsAdmin");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(userIsLoggedIn, userIsAdmin, productController.createProduct);

router
  .route("/:id")
  .put(userIsLoggedIn, userIsAdmin, productController.updateProduct)
  .delete(userIsLoggedIn, userIsAdmin, productController.deleteProduct);

router.get("/id/:id", productController.getProductById);
router.get("/name/:name", productController.getProductByName);

module.exports = router;
