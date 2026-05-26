class RoomStatus {
  static AVAILABLE = 'AVAILABLE';
  static OCCUPIED = 'OCCUPIED';
  static MAINTENANCE = 'MAINTENANCE';
  static CLOSED = 'CLOSED';

  static values() {
    return [
      this.AVAILABLE,
      this.OCCUPIED,
      this.MAINTENANCE,
      this.CLOSED
    ];
  }

  static isValid(status) {
    return this.values().includes(status);
  }
}

module.exports = RoomStatus;
