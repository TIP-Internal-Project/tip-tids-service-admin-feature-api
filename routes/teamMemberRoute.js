const express = require('express');
const router = express.Router();
const teamMemberController = require('../controllers/teamMemberController');

router.get('/getTeamMemberInfoByName/:employeeName', teamMemberController.getTeamMemberInfoByName);

router.get('/getCount', teamMemberController.getCount);

module.exports = router;