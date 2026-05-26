const BookingService = require('../services/BookingService');

class BookingController {
  constructor() {
    this.bookingService = new BookingService();
  }

  async createBooking(req, res) {
    try {
      const bookingData = req.body;
      const booking = await this.bookingService.createBooking(bookingData);

      return res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: booking,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getBookingById(req, res) {
    try {
      const { id } = req.params;
      const booking = await this.bookingService.getBookingById(id);

      return res.status(200).json({
        success: true,
        message: 'Booking retrieved successfully',
        data: booking,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUserBookings(req, res) {
    try {
      const { userId } = req.params;
      const bookings = await this.bookingService.getUserBookings(userId);

      return res.status(200).json({
        success: true,
        message: 'User bookings retrieved successfully',
        data: bookings,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async approveBooking(req, res) {
    try {
      const { id } = req.params;
      const { adminId } = req.body;
      const booking = await this.bookingService.approveBooking(id, adminId);

      return res.status(200).json({
        success: true,
        message: 'Booking approved successfully',
        data: booking,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async rejectBooking(req, res) {
    try {
      const { id } = req.params;
      const booking = await this.bookingService.rejectBooking(id);

      return res.status(200).json({
        success: true,
        message: 'Booking rejected successfully',
        data: booking,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async cancelBooking(req, res) {
    try {
      const { id } = req.params;
      const booking = await this.bookingService.cancelBooking(id);

      return res.status(200).json({
        success: true,
        message: 'Booking cancelled successfully',
        data: booking,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateBooking(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const booking = await this.bookingService.updateBooking(id, updateData);

      return res.status(200).json({
        success: true,
        message: 'Booking updated successfully',
        data: booking,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteBooking(req, res) {
    try {
      const { id } = req.params;
      await this.bookingService.deleteBooking(id);

      return res.status(200).json({
        success: true,
        message: 'Booking deleted successfully',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = BookingController;
