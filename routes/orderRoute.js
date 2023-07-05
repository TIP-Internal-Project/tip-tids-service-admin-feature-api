const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/getAllOrders', orderController.getAllOrders);

router.post('/addOrder', orderController.addOrder);

router.put('/updateOrderById/:orderId', orderController.updateOrderById);

module.exports = router;