const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController.js");

router.post("/restaurant/:restaurantId",eventController.createEvents);

router.get("/:restaurantId",eventController.findRestaurantsEvents);

router.delete("/:id", eventController.deleteEvents);

module.exports = router;
