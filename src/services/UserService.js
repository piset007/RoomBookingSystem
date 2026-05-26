const UserRepository = require('../repositories/UserRepository');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getAllUsers(page = 1, limit = 10) {
    return this.userRepository.paginate(page, limit);
  }

  async getUsersByRole(role) {
    return this.userRepository.findByRole(role);
  }

  async updateUser(userId, updateData) {
    // Don't allow updating password through this method
    const { password, ...safeData } = updateData;
    return this.userRepository.update(userId, safeData);
  }

  async deleteUser(userId) {
    return this.userRepository.delete(userId);
  }

  async deactivateUser(userId) {
    return this.userRepository.update(userId, { isActive: false });
  }

  async activateUser(userId) {
    return this.userRepository.update(userId, { isActive: true });
  }
}

module.exports = UserService;
