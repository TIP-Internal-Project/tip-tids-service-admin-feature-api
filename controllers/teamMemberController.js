const TeamMemberService = require('../services/teamMemberService');

const getTeamMemberInfoByName = async (req, res) => {
  const teamMember = await TeamMemberService.getTeamMemberInfoByName(req.params.employeeName);
  if(teamMember.length > 0) {
    return res.send(teamMember)
  }
  res.status(404).json({ message: 'not found' });
};

const getCount = async (req, res) => {
    const teamMemberCount = await TeamMemberService.getCount();
    res.status(200).json(teamMemberCount);
};

module.exports = {getTeamMemberInfoByName, getCount};