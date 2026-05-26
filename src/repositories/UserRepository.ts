import { Role } from '../enums/Role';
import pool from '../config/database';
import BaseRepository from './BaseRepository';

export class UserRepository extends BaseRepository {
  constructor() {
    super('users');
  }

  public async findAll() {
    const [rows] = await pool.query('SELECT id, fullName, email, role, department, isActive, createdAt, updatedAt FROM users');
    return rows;
  }

  public async findById(id: number) {
    const [rows] = await pool.query(
      'SELECT id, fullName, email, role, department, isActive, createdAt, updatedAt FROM users WHERE id = ? LIMIT 1',
      [id],
    );
    const users = rows as any[];
    return users[0] || null;
  }

  public async findByEmail(email: string) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    const users = rows as any[];
    return users[0] || null;
  }

  public async findByRole(role: Role) {
    const [rows] = await pool.query('SELECT * FROM users WHERE role = ?', [role]);
    return rows;
  }
}

export default UserRepository;
