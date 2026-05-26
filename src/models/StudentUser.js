const User = require('./User');

class StudentUser extends User {
  static init() {
    super.init();
    this.addHook('beforeCreate', (user) => {
      user.type = 'StudentUser';
    });
    return this;
  }

  // Student-specific methods
  async viewAvailableRooms() {
    // Implementation here
  }

  async getSchedule() {
    // Implementation here
  }
}

module.exports = StudentUser;
