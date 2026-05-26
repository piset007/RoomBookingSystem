const User = require('./User');

class TeacherUser extends User {
  static init() {
    super.init();
    this.addHook('beforeCreate', (user) => {
      user.type = 'TeacherUser';
    });
    return this;
  }

  // Teacher-specific methods
  async bookRoom(roomId, startTime, endTime) {
    // Implementation here
  }

  async getMyBookings() {
    // Implementation here
  }
}

module.exports = TeacherUser;
