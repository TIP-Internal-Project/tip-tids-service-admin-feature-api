const mongoose = require('mongoose');

let Event;

try {
  Event = mongoose.model('events');
} catch (error) {
  // Define the schema and create the model if it doesn't exist
  const { Schema } = mongoose;
  const eventSchema = new Schema({
    eventId: {type:Number},
    title: {type:String},
    detail: String,  // should be Rich Text
    venue: String,
    venueDetails: String,
    category: String,
    starsNum: Number,    
    startDate: Date,
    endDate: Date,
    startTime: Date, // timestamp
    endTime: Date, // timestamp
    code: String,
    createdDate: Date, // timestamp
    createdBy:String,
    updatedDate: Date, // timestamp
    updatedBy: String,

    
    //++++++++ additional attributes not included on the data model
    important: String, // to check if the event is important


  });

  Event = mongoose.model('events', eventSchema);
}

module.exports = Event;