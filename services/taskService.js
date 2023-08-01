const Task = require('../models/Task');
const CompletedTask = require('../models/CompletedTask');
const mongoose = require('mongoose');

class TaskService {

    async getAllTasks() {
        const tasks = await Task.find();
        return tasks
    }

    async addTask(taskBody) {
        const task = await Task.create(taskBody);
        return task;
    }

    async completeTask(taskId, email) {
        let completedTask = new CompletedTask({
            taskId: taskId,
            email: email,
            completionDate: new Date()
        });
        completedTask.save();
        return completedTask
    }

	async updateTaskById(taskId, taskBody) {
		const task = await Task.findOneAndUpdate({ taskId: taskId }, taskBody, { new: true, useFindAndModify: false });
		return task;
	}

}

module.exports = new TaskService();
