const teamMembersService = require('../services/team-members');
const schema = require('../schema/team-members');

exports.getAllTeamMembers = async (req, res) => {
  const teamMembers = await teamMembersService.getAllTeamMembers();
  res.status(200).send(teamMembers);
}

exports.createTeamMember = async (req, res) => {
  const teamMembers = await teamMembersService.createTeamMember(req.body);
  res.status(200).send(teamMembers);
}

exports.getTeamMemberProfileById = async (req, res) => {
  const teamMemberProfile = await teamMembersService.getTeamMemberProfileById(req.params.id);
  if (teamMemberProfile.length === 0) {
    res.status(400).send({ error: "No team member found." })
  } else {
    res.status(200).send(teamMemberProfile);
  }
}

exports.updateTeamMemberProfile = async (req, res) => {
  const teamMemberProfile = await teamMembersService.updateTeamMemberProfile(req.params.id, req.body);
  if (teamMemberProfile === null) {
    res.status(400).send({ error: "No team member found." })
  } else {
    const { error } = schema.updateTeamMemberProfile.validate(req.body);
    if (!!error) {
      return res.status(400).send({ error: "Insufficient data provided." })
    } else {
      res.status(200).send(teamMemberProfile);
    }
  }
}
