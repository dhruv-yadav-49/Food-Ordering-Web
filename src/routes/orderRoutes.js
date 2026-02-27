const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController.js");
const authenticate = require("../middleware/authenticate.js");

router.post('',authenticate, orderController.createOrder);
router.get('/user',authenticate, orderController.getAllUserOrders);

module.exports = router;