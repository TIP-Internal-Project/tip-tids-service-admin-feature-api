const Event = require('../models/Event');
const Registration = require('../models/Registration');

// Set the schema options for the Event model
Event.schema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.eventId = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.registered; // Remove the 'registered' property from the returned JSON
    return ret;
  }
});

class AddEventService {
    async createEvent(eventData) {
      const event = new Event(eventData);
      event.createdDate = new Date(); // Set the createdDate property to the current date
  
      // Generate the next eventId
      const count = await Event.countDocuments();
      event.eventId = (count + 1).toString().padStart(6, '0'); // Generate a six-digit eventId with leading zeros
  
      await event.save();
      return event;
    }
  }
  
  module.exports = new AddEventService();