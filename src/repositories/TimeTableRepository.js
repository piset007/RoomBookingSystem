const BaseRepository = require('./BaseRepository');
const TimeTable = require('../models/TimeTable');

class TimeTableRepository extends BaseRepository {
  constructor() {
    super(TimeTable);
  }

  async findByRoomId(roomId) {
    return this.findAll({
      where: { roomId },
      include: ['room'],
    });
  }

  async findByDayOfWeek(dayOfWeek) {
    return this.findAll({
      where: { dayOfWeek },
    });
  }

  async findRecurringSchedules() {
    return this.findAll({
      where: { isRecurring: true },
    });
  }

  async findByRoomAndDay(roomId, dayOfWeek) {
    return this.findAll({
      where: { roomId, dayOfWeek },
    });
  }
}

module.exports = TimeTableRepository;
