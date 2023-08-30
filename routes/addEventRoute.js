const express = require('express');
const multer = require('multer');

const router = express.Router();
const addEventController = require('../controllers/addEventController');

const multerMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as needed
  },
});

// Define route
router.post('/', multerMiddleware.single('imgfile'), addEventController.createEvent);

module.exports = router;
