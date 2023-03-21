const Event = require('../models/event');



    // to remove the default properties of the JSON that is not needed after POST and set the default id to eventId
   
Event.schema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.eventId = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});


class EventService {
  async createEvent(eventData) {
    const event = new Event(eventData);
    event.createdDate = new Date(); // Set the createdDate property to the current date
    await event.save();
    return event;
  }


  async getEvents() {
    const events = await Event.find();
    return events;
  }


  async getEventById(id) {
    const event = await Event.findById(id);
    return event;
  }

  async deleteEvent(id) {
    const event = await Event.findByIdAndDelete(id);
    return event;
  }

  async updateEvent(id, eventData) {
    const event = await Event.findByIdAndUpdate(id, eventData, { new: true });
    event.updateEvent = new Date(); 
    return event;
  }
}



module.exports = new EventService();