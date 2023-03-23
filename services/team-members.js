const TeamMember = require('../models/TeamMember');

class TeamMemberService {
  async getAllTeamMembers() {
    const teamMembers = await TeamMember.find();
    return teamMembers;
  }

  async getTeamMemberById(employeeId) {
    const teamMember = await TeamMember.find({ employeeId: employeeId });
    return teamMember;
  }

  async updateTeamMember(employeeId, updatedDetails) {
    const teamMember = await TeamMember.findOneAndUpdate({ employeeId: employeeId }, updatedDetails, { new: true });
    return teamMember;
  }

  async createTeamMember(details) {
    const teamMember = await TeamMember.create(details);
    return teamMember;
  }
}

module.exports = new TeamMemberService();
