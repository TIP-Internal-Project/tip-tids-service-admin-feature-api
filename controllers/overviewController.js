const OverviewService = require('../services/overviewService');

const getUpcomingEventsCount = async (req, res) => {
    try {
      const eventsCount = await OverviewService.getUpcomingEventsCount();
      res.status(200).json(eventsCount);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
};

const getPendingTasksCountById = async (req, res) => {
    try {
      const tasksCount = await OverviewService.getPendingTasksCountById(req.params.id);
      res.status(200).json(tasksCount);
      if (!tasksCount) {
        return res.status(404).json({ message: 'Id not found' });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
};

const getTasksById = async (req, res) => {
    try {
      const tasks = await OverviewService.getTasksById(req.params.id);
      res.status(200).json(tasks);
      if (!tasks) {
        return res.status(404).json({ message: 'Id not found' });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
};

const addTask = async (req, res) => {
    try {
      const task = await OverviewService.addTask(req.body);
      res.status(200).json(task);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
};

const getEvents = async (req, res) => {
    try {
      const event = await OverviewService.getEvents();
      res.status(200).json(event);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
};

//for testing only
const addEvent = async (req, res) => {
    try {
      const event = await OverviewService.addEvent(req.body);
      res.status(200).json(event);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
};

const getTeamMemberInfoById = async (req, res) => {
  try {
    const teamMember = await OverviewService.getTeamMemberInfoById(req.params.id);
    console.log(teamMember);
    console.log(req.params.id);
    res.status(200).json(teamMember);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getUpcomingEventsCount, getPendingTasksCountById, getTasksById, addTask, getEvents, addEvent, getTeamMemberInfoById};