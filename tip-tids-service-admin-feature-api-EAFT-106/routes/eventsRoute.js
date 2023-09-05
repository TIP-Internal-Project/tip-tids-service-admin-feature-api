const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.get('/getAllEvents', eventsController.getAllEvents);

router.post('/register', eventsController.register);

router.get('/getUnregisteredEvents/:email', eventsController.getUnregisteredEvents);

router.get('/getRegisteredEvents/:email', eventsController.getRegisteredEvents);

router.patch('/updateEvent/:eventId', eventsController.updateEvent)

router.put('/deleteEvent/:eventId', eventsController.deleteEvent)

module.exports = router;
