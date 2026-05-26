const BookingRepository = require('../repositories/BookingRepository');
const RoomRepository = require('../repositories/RoomRepository');
const BookingStatus = require('../enums/BookingStatus');

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
    this.roomRepository = new RoomRepository();
  }

  async createBooking(bookingData) {
    const { roomId, startDate, endDate } = bookingData;

    // Check for conflicts
    const conflicts = await this.bookingRepository.findConflictingBookings(
      roomId,
      startDate,
      endDate
    );

    if (conflicts.length > 0) {
      throw new Error('Room is already booked for this time period');
    }

    return this.bookingRepository.create(bookingData);
  }

  async getBookingById(bookingId) {
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  }

  async getUserBookings(userId) {
    return this.bookingRepository.findByUserId(userId);
  }

  async getRoomBookings(roomId) {
    return this.bookingRepository.findByRoomId(roomId);
  }

  async approveBooking(bookingId, adminId) {
    const booking = await this.getBookingById(bookingId);
    return this.bookingRepository.update(bookingId, {
      status: BookingStatus.APPROVED,
      approvedBy: adminId,
    });
  }

  async rejectBooking(bookingId) {
    const booking = await this.getBookingById(bookingId);
    return this.bookingRepository.update(bookingId, {
      status: BookingStatus.REJECTED,
    });
  }

  async cancelBooking(bookingId) {
    const booking = await this.getBookingById(bookingId);
    return this.bookingRepository.update(bookingId, {
      status: BookingStatus.CANCELLED,
    });
  }

  async updateBooking(bookingId, updateData) {
    const { startDate, endDate } = updateData;
    const booking = await this.getBookingById(bookingId);

    // Check for conflicts if dates changed
    if (startDate || endDate) {
      const conflicts = await this.bookingRepository.findConflictingBookings(
        booking.roomId,
        startDate || booking.startDate,
        endDate || booking.endDate,
        bookingId
      );

      if (conflicts.length > 0) {
        throw new Error('Room is already booked for this time period');
      }
    }

    return this.bookingRepository.update(bookingId, updateData);
  }

  async deleteBooking(bookingId) {
    return this.bookingRepository.delete(bookingId);
  }
}

module.exports = BookingService;
