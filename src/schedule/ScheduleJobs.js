const schedule = require("node-schedule");
const Event = require("../models/Event");

module.exports = function ScheduleJobs() {
  schedule.scheduleJob("*/1 * * * *", async () => {
    const now = new Date();
    const outdatedEvents = await Event.find({
      endDate: { $lt: now },
      status: { $nin: ["Completed", "Archived"] },
    });

    for (const event of outdatedEvents) {
      if (new Date(event.endDate.setHours(event.endDate.getHours())) <= now) {
        event.status = "Completed";
        await event.save();
        console.log("Event ID " + event.eventId + " is Completed");
      }
    }
  });
};
