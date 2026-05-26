class BookingStatus {
  static PENDING = 'PENDING';
  static APPROVED = 'APPROVED';
  static REJECTED = 'REJECTED';
  static CANCELLED = 'CANCELLED';
  static COMPLETED = 'COMPLETED';

  static values() {
    return [
      this.PENDING,
      this.APPROVED,
      this.REJECTED,
      this.CANCELLED,
      this.COMPLETED
    ];
  }

  static isValid(status) {
    return this.values().includes(status);
  }
}

module.exports = BookingStatus;
