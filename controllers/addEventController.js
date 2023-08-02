const AddEventService = require('../services/addEventService');

exports.createEvent = async (req, res) => {
  try {

    const eventDataWithQRCode = { ...req.body, qrCodeUrl: req.body.qrCodeUrl }
    
    const event = await AddEventService.createEvent(eventDataWithQRCode)
    res.status(200).json(event);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
