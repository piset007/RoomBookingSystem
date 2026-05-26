const express = require('express');
const TimeTableController = require('../controllers/TimeTableController');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const router = express.Router();
const timeTableController = new TimeTableController();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Public timetable routes (authenticated users)
router.get('/room/:roomId', (req, res) => timeTableController.getRoomSchedule(req, res));
router.get('/day/:day', (req, res) => timeTableController.getScheduleByDay(req, res));
router.get('/:id', (req, res) => timeTableController.getTimeTableById(req, res));

// Admin-only routes
router.post(
  '/',
  roleMiddleware(['ADMIN']),
  (req, res) => timeTableController.createTimeTable(req, res)
);

router.put(
  '/:id',
  roleMiddleware(['ADMIN']),
  (req, res) => timeTableController.updateTimeTable(req, res)
);

router.delete(
  '/:id',
  roleMiddleware(['ADMIN']),
  (req, res) => timeTableController.deleteTimeTable(req, res)
);

module.exports = router;
