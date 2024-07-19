const TeamRosterService = require("../services/TeamRosterService");

const getAllTeamMember = async (req, res) => {
  const teamMembers = await TeamRosterService.getAllTeamMember();
  res.status(200).json(teamMembers);
};

const getTeamMemberInfoByEmail = async (req, res) => {
  const teamMember = await TeamRosterService.getTeamMemberInfoByEmail(
    req.params.workEmailAddress
  );
  if (teamMember.length > 0) {
    return res.send(teamMember);
  }
  res.status(404).json({ message: "not found" });
};

module.exports = { getAllTeamMember, getTeamMemberInfoByEmail };
