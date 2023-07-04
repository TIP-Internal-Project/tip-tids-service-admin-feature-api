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

module.exports = {getAllEvents, register, getUnregisteredEvents, getRegisteredEvents}