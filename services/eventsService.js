const Event = require('../models/Event');
const Registration = require('../models/Registration');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
	projectId: 'engagement-app-288317', 
	keyFilename: './engagementAppKey.json', 
  });
  
  const bucket = storage.bucket('engagement-app-image-storage'); 
  


class EventsService {

	async getAllEvents() {
		const events = await Event.find();
		return events;
	}

	async register(registrationBody) {
		const registration = await Registration.create(registrationBody);
		return registration;
	}

	async getRegisteredEvents(email) {
		const registeredEventIds = await getRegisteredEventIds(email);
		const registeredEvents = await Event.find({
			eventId: { $in: registeredEventIds }
		});
		return registeredEvents;
	}

	async getUnregisteredEvents(email) {
		// Get the IDs of events registered by the email
		const registeredEventIds = await getRegisteredEventIds(email);
		const unregisteredEvents = await Event.find({
			eventId: { $nin: registeredEventIds }
		});
		return unregisteredEvents;
	}

	async updateEvent(eventId, updatedDetails, imageFile) {
		try {
		  const event = await Event.findOne({ eventId: eventId }); // Find the event to update
	  
		  if (!event) {
			throw new Error('Event not found');
		  }
		  const { title } = updatedDetails;
		   let imageUrl = event.imageUrl;
		  const now = new Date();
			const datePart = now.toISOString().split('T')[0]; // Get the date part
			const timePart = now.toTimeString().split(' ')[0].replace(/:/g, '-');


		  if (imageFile) {
			console.log('Calling uploadImage function...');
			 
			const fileName = `images/${title}-${datePart}-${timePart}-${imageFile.originalname}`;
	  
			imageUrl = await this.uploadImage(imageFile.buffer, fileName);
			console.log('Image URL:', imageUrl);
	  
			event.imageUrl = imageUrl;
		  }
	  
		  event.set(updatedDetails);
	  
		  await event.save();
	  
		  console.log('Event updated:', event);
		  return event;
		} catch (error) {
		  console.error('Error updating event:', error);
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
	 


	async deleteEvent(eventId, eventBody) {
		const event = await Event.findOneAndUpdate({ eventId: eventId }, eventBody, { new: true, useFindAndModify: false });
		return event;
	}


}

async function getRegisteredEventIds(email) {
	const registrations = await Registration.find({ email });
	return registrations.map(registration => registration.eventId);
}

module.exports = new EventsService();
