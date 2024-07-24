const Task = require("../models/Task");
const TaskService = require("../services/TaskService");

const getAllTasks = async (req, res) => {
  const tasks = await TaskService.getAllTasks();
  res.status(200).json(tasks);
};

const addTask = async (req, res) => {
  const task = await TaskService.addTask(req.body);
  res.status(200).json(task);
};

const completeTask = async (req, res) => {
  const completedTask = await TaskService.completeTask(
    req.params.taskId,
    req.params.email
  );
  res.status(200).json(completedTask);
};

const udpateTaskById = async (req, res) => {
  const task = await TaskService.updateTaskById(req.params.taskId, req.body);
  res.status(200).json(task);
};

const getCompletedTasks = async (req, res) => {
  const tasks = await TaskService.getCompletedTasks(req.params.email);
  res.status(200).json(tasks);
};

const getIncompleteTasks = async (req, res) => {
  const tasks = await TaskService.getIncompleteTasks(req.params.email);
  res.status(200).json(tasks);
};

const deleteTask = async (req, res) => {
  const task = await TaskService.deleteTask(req.params.taskId, req.body);
  res.status(200).json(task);
};

module.exports = {
  addTask,
  getAllTasks,
  completeTask,
  udpateTaskById,
  getCompletedTasks,
  getIncompleteTasks,
  deleteTask,
};
