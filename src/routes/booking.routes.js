const express = require('express');
const BookingController = require('../controllers/BookingController');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { validateMiddleware, createBookingSchema } = require('../middlewares/validate.middleware');

const router = express.Router();
const bookingController = new BookingController();

// Apply auth middleware to all booking routes
router.use(authMiddleware);

// User booking routes
router.post(
  '/',
  validateMiddleware(createBookingSchema),
  (req, res) => bookingController.createBooking(req, res)
);

router.get('/:id', (req, res) => bookingController.getBookingById(req, res));
router.get('/user/:userId', (req, res) => bookingController.getUserBookings(req, res));

router.put('/:id', (req, res) => bookingController.updateBooking(req, res));
router.delete('/:id', (req, res) => bookingController.deleteBooking(req, res));

// Admin-only routes
router.post(
  '/:id/approve',
  roleMiddleware(['ADMIN']),
  (req, res) => bookingController.approveBooking(req, res)
);

router.post(
  '/:id/reject',
  roleMiddleware(['ADMIN']),
  (req, res) => bookingController.rejectBooking(req, res)
);

router.post('/:id/cancel', (req, res) => bookingController.cancelBooking(req, res));

module.exports = router;
