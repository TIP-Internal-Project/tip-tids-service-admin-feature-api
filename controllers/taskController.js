const Task = require('../models/Task');
const TaskService = require('../services/taskService');

const addTask = async (req, res) => {
	const task = await TaskService.addTask(req.body);
	res.status(200).json(task);
};

module.exports = {addTask}