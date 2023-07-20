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
        eventDetails: {
            type: String
        },
        venueDetails: {
            type: String
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
        code: {
            type: String
        },
        category: {
            type: String
        },
        importance: {
            type: String
        },
        gmeetLink: {
            type: String
        },
        postEventSurveyURL: {
            type: String
        },
        starsNum: {
            type: Number
        },
        regLink: {
            type: String
        },
        qrLink: {
            type: String
        },
        createdAt: {
            type: Date, default: Date.now
        },
        createdBy: {
            type: String
        },
        updatedAt: {
            type: Date, default: Date.now
        },
        updatedBy: {
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
