const TeamMemberProfile = require('../models/TeamMemberProfile');

class TeamMemberService {
  async getAllTeamMembers() {
    const teamMembers = await TeamMemberProfile.find();
    return teamMembers;
  }

  async getTeamMemberProfileById(employeeId) {
    const teamMemberProfile = await TeamMemberProfile.find({ employeeId: employeeId });
    return teamMemberProfile;
  }

  async updateTeamMemberProfile(employeeId, updatedDetails) {
    const teamMemberProfile = await TeamMemberProfile.findOneAndUpdate({ employeeId: employeeId }, updatedDetails, { new: true });
    return teamMemberProfile;
  }

  async createTeamMember(details) {
    const teamMemberProfile = await TeamMemberProfile.create(details);
    return teamMemberProfile;
  }
}

module.exports = new TeamMemberService();
