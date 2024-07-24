const TeamRosterService = require("../services/TeamRosterService");

const getAllTeamMember = async (req, res) => {
  const teamMembers = await TeamRosterService.getAllTeamMember();
  res.status(200).json(teamMembers);
};

const getTeamMemberInfoByEmail = async (req, res) => {
  const { workEmailAddress } = req.params;

  // Check if the email parameter is missing or invalid
  if (!workEmailAddress || !workEmailAddress.includes("@")) {
    return res
      .status(400)
      .json({ message: "Invalid or missing email parameter" });
  }

  try {
    const teamMember = await TeamRosterService.getTeamMemberInfoByEmail(
      workEmailAddress
    );

    if (teamMember.length > 0) {
      return res.send(teamMember);
    } else {
      return res.status(404).json({ message: "Team Member not found" });
    }
  } catch (error) {
    // Optionally handle any other errors that might occur
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllTeamMember, getTeamMemberInfoByEmail };
