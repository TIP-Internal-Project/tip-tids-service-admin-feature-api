const AddEventService = require('../services/addEventService');

exports.createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const imageFile = req.file; 
    let imageUrl = ''; 

    
    if (imageFile) {
      const imageBuffer = imageFile.buffer;
      const fileName = `${Date.now()}-${imageFile.originalname}`; 
      imageUrl = await AddEventService.uploadImage(imageBuffer, fileName); 

      
      eventData.imageUrl = imageUrl;
    }

    const event = await AddEventService.createEvent(eventData, imageFile);
    res.status(200).json(event);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
