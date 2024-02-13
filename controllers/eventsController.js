const EventsService = require('../services/eventsService');

const getAllEvents = async (req, res) => {
	const events = await EventsService.getAllEvents();
	res.status(200).json(events);
};

const getEventDetailsByDate = async (req, res) => {
	console.log(req.body);
	const eventDetails = await EventsService.getEventDetailsByDate(req.body);
	res.status(200).json(eventDetails);
};

const getEventDetails = async (req, res) => {
	const eventDetails = await EventsService.getEventDetails(req.params.eventId);
	res.status(200).json(eventDetails);
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
	const { eventId } = req.params;
	const updatedDetails = req.body;
	const imageFile = req.file; 
	if (imageFile) {
	  
	  const imageBuffer = imageFile.buffer;
	  const fileName = `${Date.now()}-${imageFile.originalname}`;
	  const imageUrl = await EventsService.uploadImage(imageBuffer, fileName);
	  updatedDetails.imageUrl = imageUrl;
	}
  
	const event = await EventsService.updateEvent(eventId, updatedDetails);
  
	if (event === null) {
	  res.status(400).send({ error: "No event found." });
	} else {
	  res.status(200).send(event);
	}
  };

const deleteEvent = async (req, res) => {
	const event = await EventsService.deleteEvent(req.params.eventId, req.body);
  	res.status(200).json(event)
}

module.exports = { getAllEvents, getEventDetailsByDate, getEventDetails, register, getUnregisteredEvents, getRegisteredEvents, updateEvent, deleteEvent }
