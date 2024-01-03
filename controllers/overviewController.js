const OverviewService = require('../services/overviewService');

const getUpcomingEventsCount = async (req, res) => {
  const eventsCount = await OverviewService.getUpcomingEventsCount();
  res.status(200).json(eventsCount);
};

const getPendingTasksCount = async (req, res) => {
  const tasksCount = await OverviewService.getPendingTasksCount(req.params.email);
  console.log(tasksCount)
  return res.status(200).json(tasksCount)
};

const getTasksById = async (req, res) => {
  const tasks = await OverviewService.getTasksById(req.params.id);
  return res.send(tasks)
};

const addTask = async (req, res) => {
  const task = await OverviewService.addTask(req.body);
  res.status(200).json(task);
};

const getEvents = async (req, res) => {
  const event = await OverviewService.getEvents();
  res.status(200).json(event);
};

const getTasks = async (req, res) => {
  const task = await OverviewService.getTasks();
  res.status(200).json(task);
};

const getTeamMemberInfoById = async (req, res) => {
  const teamMember = await OverviewService.getTeamMemberInfoById(req.params.id);
  if(teamMember.length > 0) {
    return res.send(teamMember)
  }
  res.status(404).json({ message: 'Id not found' });
};

module.exports = {getUpcomingEventsCount, getPendingTasksCount, getTasksById, addTask, getEvents, getTasks, getTeamMemberInfoById};