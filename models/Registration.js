const mongoose = require('mongoose');

let Registration;

try {
    Registration = mongoose.model('registration');
} catch (error) {
    const { Schema } = mongoose;
    const registrationSchema = new Schema({
        eventId: {
			type: String
		},
        email: {
            type: String
        },
        location: {
            type: String
        },
        attendanceType: {
            type: String
        },
        registrationDate: {
            type: Date
        }
    });

	registrationSchema.set('toJSON', {
        transform: (doc, ret, options) => {
            delete ret.__v;
            return ret;
        }
    });

    Registration = mongoose.model('registration', registrationSchema);
}

module.exports = Registration;