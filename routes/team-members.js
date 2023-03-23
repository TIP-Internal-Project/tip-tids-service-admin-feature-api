const express = require('express');
const router = express.Router();

const teamMembersController = require('../controller/team-members');

router.get('/', teamMembersController.getAllTeamMembers);

router.get('/:id', teamMembersController.getTeamMemberById);

router.patch('/:id', teamMembersController.updateTeamMember);

router.post('/', teamMembersController.createTeamMember);

module.exports = router;
