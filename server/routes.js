const router = require("express").Router();
const controllers = require("./controllers");

router.get("/products", controllers.getProducts);
router.get("/products/:product_id", controllers.getProductsById);
router.get("/products/:product_id/styles", controllers.getStylesById);
router.get("/products/:product_id/related", controllers.getRelatedById);

module.exports = router;
