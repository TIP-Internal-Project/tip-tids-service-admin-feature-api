const Event = require('../models/Event');
const TaskReminder = require('../models/TaskReminder');
const TeamMember = require('../models/TeamMember')

class OverviewService{

    async getUpcomingEventsCount() {
        const eventsCount = await Event.count();
        return eventsCount;
    }

    async getPendingTasksCountById(id) {
        const tasksCount = await TaskReminder.count({createdBy:id});
        return tasksCount;
    }

    async getTasksById(id) {
        const tasks = await TaskReminder.find({createdBy:id}).sort({dueDateTime: 1}).limit(5);
        return tasks;
    }

    async addTask(taskBody) {
        const task = await TaskReminder.create(taskBody);
        return task;
    }

    async getEvents() {
        const events = await Event.find().sort({startDate: 1}).limit(5);
        return events;
    }

    //for testing only
    async addEvent(eventBody) {
        const event = await Event.create(eventBody);
        return event;
    }

    async getTeamMemberInfoById(id) {
        const teamMember = await TeamMember.where('workdayId', id);
        return teamMember;
    }
}

module.exports = new OverviewService();