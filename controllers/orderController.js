const OrderService = require('../services/orderService');

const getAllOrders = async (req, res) => {
	const orders = await OrderService.getAllOrders();
	res.status(200).json(orders);
};

const addOrder = async (req, res) => {
	const order = await OrderService.addOrder(req.body);
	res.status(200).json(order);
};

module.exports = {getAllOrders, addOrder}