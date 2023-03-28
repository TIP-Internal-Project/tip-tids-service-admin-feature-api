const mongoose = require('mongoose');
const { Schema } = mongoose;

let TeamMembersProfile;
try {
  TeamMembersProfile = mongoose.model('teammembers');
} catch (error) {
  const teamMemberProfileSchema = new Schema({
    employeeId: String,
    lastName: String,
    firstName: String,
    jobProfile: String,
    immediateManagerName: String,
    immediateManagerId: String,
    pictureUrl: String,
    TIEmail: String,
    clientEmail: String,
    functionalArea: String,
    subOMId: String,
    OMId: String,
  });

  TeamMembersProfile = mongoose.model('teammembers', teamMemberProfileSchema);
}

module.exports = TeamMembersProfile;
