const RoomRepository = require('../repositories/RoomRepository');
const BookingRepository = require('../repositories/BookingRepository');

class RoomService {
  constructor() {
    this.roomRepository = new RoomRepository();
    this.bookingRepository = new BookingRepository();
  }

  async createRoom(roomData) {
    return this.roomRepository.create(roomData);
  }

  async getRoomById(roomId) {
    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }
    return room;
  }

  async getAllRooms(page = 1, limit = 10) {
    return this.roomRepository.paginate(page, limit);
  }

  async getAvailableRooms() {
    return this.roomRepository.findAvailableRooms();
  }

  async getRoomsByCapacity(minCapacity) {
    return this.roomRepository.findByCapacity(minCapacity);
  }

  async updateRoom(roomId, updateData) {
    return this.roomRepository.update(roomId, updateData);
  }

  async deleteRoom(roomId) {
    return this.roomRepository.delete(roomId);
  }

  async changeRoomStatus(roomId, status) {
    return this.roomRepository.update(roomId, { status });
  }

  async getRoomWithBookings(roomId) {
    return this.roomRepository.findWithBookings(roomId);
  }
}

module.exports = RoomService;
