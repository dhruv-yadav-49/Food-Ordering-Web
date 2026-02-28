const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController.js");
const authenticate = require("../middleware/authenticate.js");

router.get("/restaurant/:id",authenticate,categoryController.getRestaurantCategories);

module.exports = router;