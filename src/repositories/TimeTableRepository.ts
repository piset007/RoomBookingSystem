import pool from '../config/database';
import BaseRepository from './BaseRepository';

export class TimeTableRepository extends BaseRepository {
  constructor() {
    super('timetables');
  }

  public async findByRoom(roomId: number) {
    const [rows] = await pool.query('SELECT * FROM timetables WHERE roomId = ?', [roomId]);
    return rows;
  }
}

export default TimeTableRepository;
