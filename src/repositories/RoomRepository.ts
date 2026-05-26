import { RoomStatus } from '../enums/RoomStatus';
import pool from '../config/database';
import BaseRepository from './BaseRepository';

export class RoomRepository extends BaseRepository {
  constructor() {
    super('rooms');
  }

  public async findAvailable() {
    const [rows] = await pool.query('SELECT * FROM rooms WHERE status = ?', [RoomStatus.AVAILABLE]);
    return rows;
  }
}

export default RoomRepository;
