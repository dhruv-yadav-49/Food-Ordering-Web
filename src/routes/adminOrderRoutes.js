const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate.js');
const orderController = require('../controllers/orderController.js');

router.delete('/:orderId',authenticate, orderController.deleteOrders);
router.get('/restaurant/:restaurantId',authenticate, orderController.getAllRestaurantOrders);
router.put('/:orderId/:orderStatus',authenticate, orderController.updateOrder);

module.exports = router;