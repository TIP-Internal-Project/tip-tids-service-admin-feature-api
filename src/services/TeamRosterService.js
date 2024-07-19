const TeamRoster = require("../models/TeamRoster");

class TeamRosterService {
  async getAllTeamMember() {
    const teamMember = await TeamRoster.find();
    return teamMember;
  }

  async getTeamMemberInfoByEmail(workEmailAddress) {
    const teamMember = await TeamRoster.find({ workEmailAddress });
    return teamMember;
  }
}

module.exports = new TeamRosterService();
