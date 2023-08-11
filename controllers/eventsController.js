const EventsService = require('../services/eventsService');

const getAllEvents = async (req, res) => {
	const events = await EventsService.getAllEvents();
	res.status(200).json(events);
};

const register = async (req, res) => {
	const registration = await EventsService.register(req.body);
	res.status(200).json(registration);
};

const getRegisteredEvents = async (req, res) => {
	const events = await EventsService.getRegisteredEvents(req.params.email);
	res.status(200).json(events);
};

const getUnregisteredEvents = async (req, res) => {
	const events = await EventsService.getUnregisteredEvents(req.params.email);
	res.status(200).json(events);
};

const updateEvent = async (req, res) => {
	const event = await EventsService.updateEvent(req.params.eventId, req.body);
	if (event === null) {
		res.status(400).send({ error: "No event found." })
	} else {
		res.status(200).send(event);
	}
}

const deleteEvent = async (req, res) => {
	const event = await EventsService.deleteEvent(req.params.eventId, req.body);
  	res.status(200).json(event)
}

module.exports = { getAllEvents, register, getUnregisteredEvents, getRegisteredEvents, updateEvent, deleteEvent }
