import pool from '../config/database';
import BaseRepository from './BaseRepository';

export class TimeTableRepository extends BaseRepository {
  constructor() {
    super('class_schedules');
  }

  public async findByRoom(roomId: number) {
    const [rows] = await pool.query('SELECT * FROM class_schedules WHERE roomId = ?', [roomId]);
    return rows;
  }
}

export default TimeTableRepository;
