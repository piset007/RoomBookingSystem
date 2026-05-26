const BaseRepository = require('./BaseRepository');
const Room = require('../models/Room');

class RoomRepository extends BaseRepository {
  constructor() {
    super(Room);
  }

  async findByRoomNumber(roomNumber) {
    return this.findOne({ roomNumber });
  }

  async findAvailableRooms() {
    return this.findAll({
      where: { status: 'AVAILABLE' },
    });
  }

  async findByCapacity(minCapacity) {
    const { Op } = require('sequelize');
    return this.findAll({
      where: {
        capacity: { [Op.gte]: minCapacity },
      },
    });
  }

  async findByBuilding(building) {
    return this.findAll({
      where: { building },
    });
  }

  async findWithBookings(roomId) {
    return this.model.findByPk(roomId, {
      include: [
        {
          association: 'bookings',
        },
      ],
    });
  }
}

module.exports = RoomRepository;
