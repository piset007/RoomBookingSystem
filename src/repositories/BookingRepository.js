const BaseRepository = require('./BaseRepository');
const Booking = require('../models/Booking');
const { Op } = require('sequelize');

class BookingRepository extends BaseRepository {
  constructor() {
    super(Booking);
  }

  async findByUserId(userId) {
    return this.findAll({
      where: { userId },
      include: ['room', 'user'],
    });
  }

  async findByRoomId(roomId) {
    return this.findAll({
      where: { roomId },
      include: ['user'],
    });
  }

  async findByStatus(status) {
    return this.findAll({
      where: { status },
    });
  }

  async findConflictingBookings(roomId, startDate, endDate, excludeId = null) {
    const where = {
      roomId,
      [Op.or]: [
        {
          startDate: { [Op.lt]: endDate },
          endDate: { [Op.gt]: startDate },
        },
      ],
    };

    if (excludeId) {
      where.id = { [Op.ne]: excludeId };
    }

    return this.findAll({ where });
  }

  async findUpcomingBookings(roomId) {
    return this.findAll({
      where: {
        roomId,
        startDate: { [Op.gte]: new Date() },
      },
      order: [['startDate', 'ASC']],
    });
  }
}

module.exports = BookingRepository;
