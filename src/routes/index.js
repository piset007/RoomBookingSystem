const express = require('express');
const authRoutes = require('./auth.routes');
const roomRoutes = require('./room.routes');
const bookingRoutes = require('./booking.routes');
const timeTableRoutes = require('./timetable.routes');

const router = express.Router();

// API routes
router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);
router.use('/bookings', bookingRoutes);
router.use('/timetables', timeTableRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
