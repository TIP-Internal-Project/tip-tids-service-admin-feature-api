const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const multer = require('multer')
const multerMiddleware = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, 
    },
  })
  

router.get('/getAllEvents', eventsController.getAllEvents);

router.post('/getEventDetailsByDate', eventsController.getEventDetailsByDate);

router.get('/getEventDetails/:eventId', eventsController.getEventDetails);

router.post('/register', eventsController.register);

router.get('/getUnregisteredEvents/:email', eventsController.getUnregisteredEvents);

router.get('/getRegisteredEvents/:email', eventsController.getRegisteredEvents);

router.patch('/updateEvent/:eventId', multerMiddleware.single('imageFile'), eventsController.updateEvent);

router.put('/deleteEvent/:eventId', eventsController.deleteEvent)

module.exports = router;
