const TimeTableRepository = require('../repositories/TimeTableRepository');

class TimeTableService {
  constructor() {
    this.timeTableRepository = new TimeTableRepository();
  }

  async createTimeTable(timeTableData) {
    return this.timeTableRepository.create(timeTableData);
  }

  async getTimeTableById(timeTableId) {
    const timeTable = await this.timeTableRepository.findById(timeTableId);
    if (!timeTable) {
      throw new Error('TimeTable not found');
    }
    return timeTable;
  }

  async getRoomSchedule(roomId) {
    return this.timeTableRepository.findByRoomId(roomId);
  }

  async getScheduleByDay(dayOfWeek) {
    return this.timeTableRepository.findByDayOfWeek(dayOfWeek);
  }

  async getRoomScheduleByDay(roomId, dayOfWeek) {
    return this.timeTableRepository.findByRoomAndDay(roomId, dayOfWeek);
  }

  async updateTimeTable(timeTableId, updateData) {
    return this.timeTableRepository.update(timeTableId, updateData);
  }

  async deleteTimeTable(timeTableId) {
    return this.timeTableRepository.delete(timeTableId);
  }

  async getRecurringSchedules() {
    return this.timeTableRepository.findRecurringSchedules();
  }
}

module.exports = TimeTableService;
