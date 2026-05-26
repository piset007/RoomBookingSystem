import bcrypt from 'bcryptjs';
import { Role } from '../enums/Role';
import BaseModel from './BaseModel';

export class User extends BaseModel {
  public fullName: string;
  public email: string;
  public password: string;
  public role: Role;
  public department: string | null;
  public isActive: boolean;

  constructor(fullName = '', email = '', password = '', role = Role.STUDENT, department: string | null = null) {
    super();
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.role = role;
    this.department = department;
    this.isActive = true;
  }

  public verifyPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  public hasPermission(_action: string): boolean {
    return false;
  }

  public toJSON() {
    const values = { ...this } as { password?: string };
    delete values.password;
    return values;
  }
}

export default User;
