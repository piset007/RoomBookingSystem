import bcrypt from 'bcryptjs';
import { Role } from '../enums/Role';
import UserRepository from '../repositories/UserRepository';

export interface CreateUserInput {
  fullName: string;
  email: string;
  password: string;
  role: Role;
  department?: string | null;
  isActive?: boolean;
}

export interface UpdateUserInput {
  fullName?: string;
  email?: string;
  password?: string;
  role?: Role;
  department?: string | null;
  isActive?: boolean;
}

export class UserService {
  private users = new UserRepository();

  public getUsers() {
    return this.users.findAll();
  }

  public getUser(id: number) {
    return this.users.findById(id);
  }

  public getUsersByRole(role: Role) {
    return this.users.findByRole(role);
  }

  public async createUser(data: CreateUserInput) {
    return this.users.create({
      ...data,
      password: await this.hashPassword(data.password),
    });
  }

  public async updateUser(id: number, data: UpdateUserInput) {
    if (!data.password) {
      return this.users.update(id, data);
    }

    return this.users.update(id, {
      ...data,
      password: await this.hashPassword(data.password),
    });
  }

  public deleteUser(id: number) {
    return this.users.delete(id);
  }

  private hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }
}

export default UserService;
