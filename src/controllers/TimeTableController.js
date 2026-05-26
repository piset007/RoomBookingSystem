const TimeTableService = require('../services/TimeTableService');

class TimeTableController {
  constructor() {
    this.timeTableService = new TimeTableService();
  }

  async createTimeTable(req, res) {
    try {
      const timeTableData = req.body;
      const timeTable = await this.timeTableService.createTimeTable(timeTableData);

      return res.status(201).json({
        success: true,
        message: 'TimeTable created successfully',
        data: timeTable,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getTimeTableById(req, res) {
    try {
      const { id } = req.params;
      const timeTable = await this.timeTableService.getTimeTableById(id);

      return res.status(200).json({
        success: true,
        message: 'TimeTable retrieved successfully',
        data: timeTable,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getRoomSchedule(req, res) {
    try {
      const { roomId } = req.params;
      const schedule = await this.timeTableService.getRoomSchedule(roomId);

      return res.status(200).json({
        success: true,
        message: 'Room schedule retrieved successfully',
        data: schedule,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getScheduleByDay(req, res) {
    try {
      const { day } = req.params;
      const schedule = await this.timeTableService.getScheduleByDay(day);

      return res.status(200).json({
        success: true,
        message: 'Schedule by day retrieved successfully',
        data: schedule,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateTimeTable(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const timeTable = await this.timeTableService.updateTimeTable(id, updateData);

      return res.status(200).json({
        success: true,
        message: 'TimeTable updated successfully',
        data: timeTable,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteTimeTable(req, res) {
    try {
      const { id } = req.params;
      await this.timeTableService.deleteTimeTable(id);

      return res.status(200).json({
        success: true,
        message: 'TimeTable deleted successfully',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = TimeTableController;
