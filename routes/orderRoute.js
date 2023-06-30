const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/getAllOrders', orderController.getAllOrders);

router.post('/addOrder', orderController.addOrder);

module.exports = router;