const BaseRepository = require('./BaseRepository');
const User = require('../models/User');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return this.findOne({ email });
  }

  async findByRole(role) {
    return this.findAll({
      where: { role },
    });
  }

  async findActiveUsers() {
    return this.findAll({
      where: { isActive: true },
    });
  }

  async findByIdWithDetails(id) {
    return this.model.findByPk(id, {
      include: ['role', 'permissions'],
    });
  }
}

module.exports = UserRepository;
