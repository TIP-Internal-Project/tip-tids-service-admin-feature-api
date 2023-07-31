const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/addTask', taskController.addTask);

router.get('/getAllTasks', taskController.getAllTasks)

router.post('/completeTask/:taskId/:email', taskController.completeTask);

module.exports = router;
