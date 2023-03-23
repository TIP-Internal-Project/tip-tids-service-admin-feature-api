const express = require('express');
const router = express.Router();
const overviewController = require('../controllers/overviewController');

router.get('/', function(req, res, next) {res.render('overview', { title: 'Overview API' });});

router.get('/getUpcomingEventsCount', overviewController.getUpcomingEventsCount);

router.get('/getPendingTasksCountById/:id', overviewController.getPendingTasksCountById);

router.get('/getTasksById/:id', overviewController.getTasksById);

router.post('/addTask', overviewController.addTask);

router.get('/getEvents', overviewController.getEvents);

//for testing only
//router.post('/addEvent', overviewController.addEvent);

router.get('/getTeamMemberInfoById/:id', overviewController.getTeamMemberInfoById);

module.exports = router;