const express = require('express');
const router = express = express.Router();
const cartController = require('../controllers/cartController.js');
const authenticate = require('../middleware/authenticate.js');

router.put('/update',authenticate, cartController.updateCartItemQuantity);
router.delete('/:id/remove',authenticate, cartController.removeItemFromCart);

module.exports = router;
