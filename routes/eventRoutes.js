const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


router.post('/', eventController.createEvent);

router.get('/', eventController.getEvents);

router.get('/:id', eventController.getEventById);

router.delete('/:id', eventController.deleteEvent);

router.patch('/:id', eventController.updateEvent);



module.exports = router;