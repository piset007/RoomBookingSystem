import { ResultSetHeader } from 'mysql2';
import pool from '../config/database';

export class BaseRepository {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  public async findAll() {
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName}`);
    return rows;
  }

  public async findById(id: number) {
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE id = ? LIMIT 1`, [id]);
    const list = rows as any[];
    return list[0] || null;
  }

  public async create(data: object) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const columns = keys.join(', ');
    const placeholders = keys.map(() => '?').join(', ');
    const [result] = await pool.query(`INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`, values);
    return this.findById((result as ResultSetHeader).insertId);
  }

  public async update(id: number, data: object) {
    const keys = Object.keys(data);
    if (keys.length === 0) {
      return this.findById(id);
    }

    const values = Object.values(data);
    const fields = keys.map((key) => `${key} = ?`).join(', ');
    await pool.query(`UPDATE ${this.tableName} SET ${fields} WHERE id = ?`, [...values, id]);
    return this.findById(id);
  }

  public async delete(id: number) {
    const [result] = await pool.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    return (result as ResultSetHeader).affectedRows > 0;
  }
}

export default BaseRepository;
