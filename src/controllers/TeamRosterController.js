const TeamRosterService = require("../services/TeamRosterService");

const getAllTeamMember = async (req, res) => {
  try {
    const teamMembers = await TeamRosterService.getAllTeamMember();
    res.status(200).json(teamMembers);
  } catch (error) {
    next(error);
  }
};

const getTeamMemberInfoByEmail = async (req, res, next) => {
  const { workEmailAddress } = req.params;

  // Check if the email parameter is missing or invalid
  if (!workEmailAddress || !workEmailAddress.includes("@")) {
    return next(new CustomError(400, "Invalid or missing email parameter"));
  }

  try {
    const teamMember = await TeamRosterService.getTeamMemberInfoByEmail(
      workEmailAddress
    );
    res.status(200).json(teamMember);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTeamMember, getTeamMemberInfoByEmail };
