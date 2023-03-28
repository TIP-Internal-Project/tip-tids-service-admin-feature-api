const express = require('express');
const router = express.Router();

const teamMembersController = require('../controllers/team-members');

router.get('/', teamMembersController.getAllTeamMembers);

router.get('/:id', teamMembersController.getTeamMemberProfileById);

router.patch('/:id', teamMembersController.updateTeamMemberProfile);

router.post('/', teamMembersController.createTeamMember);

module.exports = router;
