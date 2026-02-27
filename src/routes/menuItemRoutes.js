const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController.js');

router.get('/search', foodController.searchMenuItem);
router.get('/restaurant/:restaurantId', foodController.getMenuItemByRestaurantId);

module.exports = router;
