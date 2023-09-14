const Event = require('../models/Event');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'engagement-app-288317', 
  keyFilename: './engagementAppKey.json', 
});

const bucket = storage.bucket('engagement-app-image-storage'); 

// Set the schema options for the Event model
Event.schema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret._id;
    delete ret.__v;
    delete ret.registered; // Remove the 'registered' property from the returned JSON
    return ret;
  },
});

class AddEventService {

 

  async createEvent(eventData, imageFile) {
    try {
      const { title, venueDetails,} = eventData;
  
      // Upload image if provided
      let imageUrl = '';

      const now = new Date();
			const datePart = now.toISOString().split('T')[0]; // Get the date part
			const timePart = now.toTimeString().split(' ')[0].replace(/:/g, '-');



      if (imageFile) {
        console.log('Calling uploadImage function...');
        const fileName = `images/${title}-${datePart}-${timePart}-${imageFile.originalname}`;
        imageUrl = await this.uploadImage(imageFile.buffer, fileName);
        console.log('Image URL:', imageUrl);
      }
  
      // Create the event object with image URL
      const event = new Event({
        ...eventData,
        imageUrl,
        createdDate: new Date(),
        qrCodeUrl: eventData.qrCodeUrl,
        // Other event properties
      });
  
      // Generate the next eventId
      const count = await Event.find().sort({ eventId: 1 });
      if (count.length === 0) {
        event.eventId = 1;
      } else {
        event.eventId = count[count.length - 1].eventId + 1;
      }
  
      // Save the event
      await event.save();
      console.log('Event created:', event);
      return event;
    } catch (error) {
      console.log('Error creating event:', error.message);
      throw error;
    }
  }


  async uploadImage(imageBuffer, fileName) {
    try {
      console.log('Uploading image:', fileName, 'Buffer size:', imageBuffer.length);
      const file = bucket.file(fileName);
      await file.save(imageBuffer);
  
      const authenticatedURL = `https://storage.cloud.google.com/${bucket.name}/${file.name}`;
      console.log('Image uploaded. Public URL:', authenticatedURL);
  
      return authenticatedURL;
    } catch (error) {
      console.log('Error uploading image:', error.message);
      throw error;
    }
  }
 
}

module.exports = new AddEventService();
