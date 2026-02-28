const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');
const authenticate = require('../middleware/authenticate.js');

router.post('',authenticate, categoryController.createCategory);
router.get('/category/restaurants/:id',authenticate, categoryController.getRestaurantCategories);

module.exports = router;