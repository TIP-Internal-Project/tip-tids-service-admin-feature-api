const express = require('express');
const router = express.Router();
const teamMemberController = require('../controllers/teamMemberController');

router.get('/getTeamMemberInfoByName/:employeeName', teamMemberController.getTeamMemberInfoByName);

router.post('/addStarPoints', teamMemberController.addStarPoints);

module.exports = router;