const mongoose = require('mongoose');

let EngagementAdmin;

try {
    EngagementAdmin = mongoose.model('engagement_admin');
} catch (error) {
    const { Schema } = mongoose;
    const engagementAdminSchema = new Schema({
        employeeId:{
            type:String
        }
    });

    EngagementAdmin = mongoose.model('engagement_admin', engagementAdminSchema);
}

module.exports = EngagementAdmin;