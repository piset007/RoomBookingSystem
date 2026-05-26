class Role {
  static ADMIN = 'ADMIN';
  static TEACHER = 'TEACHER';
  static STUDENT = 'STUDENT';

  static values() {
    return [this.ADMIN, this.TEACHER, this.STUDENT];
  }

  static isValid(role) {
    return this.values().includes(role);
  }
}

module.exports = Role;
