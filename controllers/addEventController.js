const AddEventService = require('../services/addEventService');

exports.createEvent = async (req, res) => {
  try {
    const event = await AddEventService.createEvent(req.body);
    res.status(200).json(event);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
