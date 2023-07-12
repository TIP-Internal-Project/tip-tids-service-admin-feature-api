const Task = require('../models/Task');
const mongoose = require('mongoose');

class TaskService{

    async getAllTasks(){
        const tasks = await Task.find();
        return tasks
    }

	async addTask(taskBody) {
        const task = await Task.create(taskBody);
		return task;
    }
	
}

module.exports = new TaskService();