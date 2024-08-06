const TeamRoster = require("../models/TeamRoster");
const createHttpError = require("http-errors");

class TeamRosterService {
  async getAllTeamMember() {
    try {
      const teamMembers = await TeamRoster.find();
      if (teamMembers.length > 0) {
        return teamMembers;
      } else {
        throw new Error("Team members not found");
      }
    } catch (error) {
      throw error;
    }
  }

  async getTeamMemberInfoByEmail(workEmailAddress) {
    console.log(workEmailAddress);
    try {
      const teamMember = await TeamRoster.findOne({ workEmailAddress });
      if (!teamMember) {
        throw new createHttpError(404, "Team member not found");
      }
      return teamMember;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TeamRosterService();
