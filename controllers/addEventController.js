const AddEventService = require('../services/addEventService');

exports.createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const imageFile = req.file; // Make sure this matches the key used in Postman (imgfile)

    let imageUrl = ''; // Initialize the image URL variable

    // Check if an image is uploaded
    if (imageFile) {
      const imageBuffer = imageFile.buffer;
      const fileName = `${Date.now()}-${imageFile.originalname}`; // Generate a unique filename
      imageUrl = await AddEventService.uploadImage(imageBuffer, fileName); // Upload image and get the URL

      // Add the image URL to eventData
      eventData.imageUrl = imageUrl;
    }

    const event = await AddEventService.createEvent(eventData, imageFile);
    res.status(200).json(event);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
