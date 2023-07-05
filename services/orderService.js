const Order = require('../models/Order');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

class OrderService{

	async getAllOrders() {
        const orders = await Order.find();
        return orders;
    }

	async addOrder(orderBody) {
        const order = await Order.create(orderBody);
		return order;
    }

	async updateOrderById(orderId, orderBody) {
		const order = await Order.findOneAndUpdate({ orderId: orderId }, orderBody, { new: true, useFindAndModify: false });
		return order;
	}
	
}

module.exports = new OrderService();