const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController.js");
const authenticate = require("../middleware/authenticate.js");

router.get("/search", authenticate, foodController.searchFood);
router.get("/restaurant/:restaurantId", authenticate, foodController.getMenuItemByRestaurantId);
router.post("/", authenticate, foodController.createItem);
router.delete("/:id", authenticate, foodController.deleteItem);
router.put("/:id", authenticate, foodController.updateItemAvailability);

module.exports = router;
