const mongoose = require('mongoose');
const { Schema } = mongoose;

let TeamMembers;
try {
  TeamMembers = mongoose.model('teammembers');
} catch (error) {
  const teamMemberSchema = new Schema({
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

  TeamMembers = mongoose.model('teammembers', teamMemberSchema);
}

module.exports = TeamMembers;
