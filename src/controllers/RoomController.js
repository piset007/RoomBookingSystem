const RoomService = require('../services/RoomService');

class RoomController {
  constructor() {
    this.roomService = new RoomService();
  }

  async createRoom(req, res) {
    try {
      const roomData = req.body;
      const room = await this.roomService.createRoom(roomData);

      return res.status(201).json({
        success: true,
        message: 'Room created successfully',
        data: room,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllRooms(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const rooms = await this.roomService.getAllRooms(page, limit);

      return res.status(200).json({
        success: true,
        message: 'Rooms retrieved successfully',
        data: rooms,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getRoomById(req, res) {
    try {
      const { id } = req.params;
      const room = await this.roomService.getRoomById(id);

      return res.status(200).json({
        success: true,
        message: 'Room retrieved successfully',
        data: room,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAvailableRooms(req, res) {
    try {
      const rooms = await this.roomService.getAvailableRooms();

      return res.status(200).json({
        success: true,
        message: 'Available rooms retrieved successfully',
        data: rooms,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateRoom(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const room = await this.roomService.updateRoom(id, updateData);

      return res.status(200).json({
        success: true,
        message: 'Room updated successfully',
        data: room,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteRoom(req, res) {
    try {
      const { id } = req.params;
      await this.roomService.deleteRoom(id);

      return res.status(200).json({
        success: true,
        message: 'Room deleted successfully',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = RoomController;
