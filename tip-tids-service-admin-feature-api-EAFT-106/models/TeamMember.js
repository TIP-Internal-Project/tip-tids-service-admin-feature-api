const mongoose = require('mongoose');

let TeamMember;

try {
    TeamMember = mongoose.model('team_member');
} catch (error) {
    const { Schema } = mongoose;
    const teamMemberSchema = new Schema({
        workdayId: {
            type: Number
        },
        lastName: {
            type: String
        },
        firstName: {
            type: String
        },
        middleName: {
            type: String
        },
        immediateSupervisor: {
            type: Number
        },
        slt: {
            type: Number
        },
        functionalArea: {
            type: String
        },
        workEmail: {
            type: String
        },
        starsEarned: {
            type: Number
        },
        cop: {
            type: Number
        }
    });

    // to remove the default properties of the JSON that is not needed after POST and set the default id to eventId
    teamMemberSchema.set('toJSON', {
        transform: (doc, ret, options) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    TeamMember = mongoose.model('team_member', teamMemberSchema);
}

module.exports = TeamMember;