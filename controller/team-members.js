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

exports.getTeamMemberById = async (req, res) => {
  const teamMember = await teamMembersService.getTeamMemberById(req.params.id);
  if (teamMember.length === 0) {
    res.status(400).send({ error: "No team member found." })
  } else {
    res.status(200).send(teamMember);
  }
}

exports.updateTeamMember = async (req, res) => {
  const teamMember = await teamMembersService.updateTeamMember(req.params.id, req.body);
  if (teamMember === null) {
    res.status(400).send({ error: "No team member found." })
  } else {
    const { error } = schema.updateTeamMember.validate(req.body);
    if (!!error) {
      return res.status(400).send({ error: "Insufficient data provided." })
    } else {
      res.status(200).send(teamMember);
    }
  }
}
