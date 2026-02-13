const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController.js");
const authenticate = require("../middleware/authenticate.js");

router.get("/", authenticate, cartController.findUserCart);
router.put("/add", authenticate, cartController.addItemToCart);
router.put("/item/quantity", authenticate, cartController.updateCartItemQuantity);
router.put("/clear", authenticate, cartController.clearCart);
router.delete("/item/:id/remove", authenticate, cartController.removeItemFromCart);

module.exports = router;
