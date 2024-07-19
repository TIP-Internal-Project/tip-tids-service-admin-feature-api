const Order = require('../models/Order');
const OrderService = require('../services/orderService');

const getAllOrders = async (req, res) => {
	const orders = await OrderService.getAllOrders();
	res.status(200).json(orders);
};

const addOrder = async (req, res) => {
	const order = await OrderService.addOrder(req.body);
	res.status(200).json(order);
};

const updateOrderById = async (req, res) => {
	console.log(req.params.orderId)
	const order = await OrderService.updateOrderById(req.params.orderId, req.body);
  	res.status(200).json(order)
};

const updateOrder = async (req, res) => {
	try {
	  const orderId = req.params.id;
	  const orderData = req.body;
	  const updatedOrder = await OrderService.updateOrder(orderId, orderData);
	  res.status(200).json(updatedOrder);
	} catch (error) {
	  res.status(500).json({ error: 'Failed to update order' });
	}
  
  };

module.exports = {getAllOrders, addOrder, updateOrderById, updateOrder}