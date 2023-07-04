const Event = require('../models/Event');
const Registration = require('../models/Registration');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

class EventsService{

	async getAllEvents() {
        const events = await Event.find();
        return events;
    }

	async register(registrationBody) {
        const registration = await Registration.create(registrationBody);
		return registration;
    }

	async getRegisteredEvents(email) {
		const registeredEventIds = await getRegisteredEventIds(email);
		const registeredEvents = await Event.find({
			eventId: { $in: registeredEventIds }
		});
	    return registeredEvents;
	}

	async getUnregisteredEvents(email) {
		// Get the IDs of events registered by the email
		const registeredEventIds = await getRegisteredEventIds(email);
		const unregisteredEvents = await Event.find({
			eventId: { $nin: registeredEventIds }
		});
	    return unregisteredEvents;
	}

}

async function getRegisteredEventIds(email) {
	const registrations = await Registration.find({ email });
	return registrations.map(registration => registration.eventId);
}

module.exports = new EventsService();