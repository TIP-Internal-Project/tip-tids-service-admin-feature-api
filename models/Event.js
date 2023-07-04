const mongoose = require('mongoose');

let Event;

try {
    Event = mongoose.model('event');
} catch (error) {
    const { Schema } = mongoose;
    const eventSchema = new Schema({
        eventId: {
            type: Number
        },
        title: {
            type: String
        },
        detail: {
            type: String
        },
        venue: {
            type: String
        },
        venueDetails: {
            type: String
        },
        starsNum: {
            type: Number
        },
        pictureUrl: {
            type: String
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        startTime: {
            type: Date
        },
        endTime: {
            type: Date
        },
        code: {
            type: String
        },
        createdAt: {
            type: Date, default: Date.now
        },
        createdBy: {
            type: String
        },
        updatedAt: {
            type: Date
        },    
        updatedBy: {
            type: String
        },
        category: {
            type: String
        },    
        postEventSurveyURL: {
            type: String
        }
    });

    // to remove the default properties of the JSON that is not needed after POST and set the default id to eventId
    eventSchema.set('toJSON', {
        transform: (doc, ret, options) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    Event = mongoose.model('event', eventSchema);
}

module.exports = Event;