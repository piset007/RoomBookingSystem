const User = require('./User');

class AdminUser extends User {
  static init() {
    // Calls parent init
    super.init();
    this.addHook('beforeCreate', (user) => {
      user.type = 'AdminUser';
    });
    return this;
  }

  // Admin-specific methods
  async approveBooking(bookingId) {
    // Implementation here
  }

  async manageUsers() {
    // Implementation here
  }
}

module.exports = AdminUser;
