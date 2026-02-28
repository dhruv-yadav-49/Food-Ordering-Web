const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController.js');

// router.get('/search', foodController.searchMenuItem);
router.get('/search', foodController.searchFood);
router.get('/restaurant/:restaurantId', foodController.getMenuItemByRestaurantId);

module.exports = router;


// http://localhost:5454/api