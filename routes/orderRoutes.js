const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const order = require('../models/order');

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.findOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;