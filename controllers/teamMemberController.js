const TeamMemberService = require('../services/teamMemberService');

const getTeamMemberInfoByName = async (req, res) => {
  const teamMember = await TeamMemberService.getTeamMemberInfoByName(req.params.employeeName);
  if(teamMember.length > 0) {
    return res.send(teamMember)
  }
  res.status(404).json({ message: 'not found' });
};

const addStarPoints = async (req, res) => {
    const teamMember = await TeamMemberService.addStarPoints(req.body.employeeName, req.body.pointsToAdd);
    res.status(200).json(teamMember);
};

module.exports = {getTeamMemberInfoByName, addStarPoints};
