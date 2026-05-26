import pool from '../config/database';
import { BookingStatus } from '../enums/BookingStatus';
import BaseRepository from './BaseRepository';

export class BookingRepository extends BaseRepository {
  constructor() {
    super('bookings');
  }

  public async findByUser(userId: number) {
    const [rows] = await pool.query('SELECT * FROM bookings WHERE userId = ?', [userId]);
    return rows;
  }

  public async findByRoom(roomId: number) {
    const [rows] = await pool.query('SELECT * FROM bookings WHERE roomId = ?', [roomId]);
    return rows;
  }

  public async findActiveForRoom(roomId: number) {
    const [rows] = await pool.query(
      'SELECT * FROM bookings WHERE roomId = ? AND status IN (?, ?)',
      [roomId, BookingStatus.PENDING, BookingStatus.APPROVED],
    );
    return rows;
  }

  public async findOverlappingActive(roomId: number, startTime: Date, endTime: Date) {
    const [rows] = await pool.query(
      'SELECT * FROM bookings WHERE roomId = ? AND status IN (?, ?) AND startTime < ? AND endTime > ? LIMIT 1',
      [roomId, BookingStatus.PENDING, BookingStatus.APPROVED, endTime, startTime],
    );
    const bookings = rows as any[];
    return bookings[0] || null;
  }
}

export default BookingRepository;
