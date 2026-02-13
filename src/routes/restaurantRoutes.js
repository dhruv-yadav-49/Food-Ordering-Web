const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController.js");
const authenticate = require("../middleware/authenticate.js");

router.post("/", authenticate, restaurantController.createRestaurant);
router.get("/", authenticate, restaurantController.getAllRestaurants);
router.get("/user", authenticate, restaurantController.findRestaurantByUserId);
router.put("/:id/add-favorites", authenticate, restaurantController.addToFavorite);
router.get("/:id", authenticate, restaurantController.findRestaurantById);
router.put("/:id/status", authenticate, restaurantController.updateRestaurantStatus);
router.delete("/:id", authenticate, restaurantController.deleteRestaurantById);
router.get("/search", authenticate, restaurantController.findRestaurantByName);

module.exports = router;
