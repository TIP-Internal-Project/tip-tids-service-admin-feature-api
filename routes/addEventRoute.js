const express = require('express');
const cors = require('cors');
const router = express.Router();
const AddEventController = require('../controllers/addEventController');

// Enable CORS for all routes
router.use(cors());

router.post('/', AddEventController.createEvent);



module.exports = router;
