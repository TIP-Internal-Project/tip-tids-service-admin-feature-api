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

}

module.exports = new TaskService();
