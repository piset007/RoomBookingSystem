import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import HttpError from '../errors/HttpError';
import { Role } from '../enums/Role';
import UserRepository from '../repositories/UserRepository';

export interface AuthTokenPayload {
  id: number;
  role: string;
  email: string;
}

export interface RegisterUserInput {
  fullName: string;
  email: string;
  password: string;
  role?: Role;
  department?: string | null;
}

export class AuthService {
  private users = new UserRepository();

  public async authenticate(email: string, password: string) {
    const user = await this.getActiveUser(email);
    await this.verifyPassword(user, password);

    return this.hidePassword(user);
  }

  public async register(data: RegisterUserInput) {
    const existingUser = await this.users.findByEmail(data.email);
    if (existingUser) {
      throw new HttpError(409, 'Email already registered');
    }

    const user = await this.users.create({
      fullName: data.fullName,
      email: data.email,
      password: await bcrypt.hash(data.password, 12),
      role: data.role ?? Role.STUDENT,
      department: data.department ?? null,
      isActive: true,
    });

    return this.hidePassword(user);
  }

  public issueToken(user: any): string {
    return jwt.sign(this.createTokenPayload(user), this.getSecret(), this.getSignOptions());
  }

  public createTokenPayload(user: { id: number; role: string; email: string }): AuthTokenPayload {
    return {
      id: user.id,
      role: user.role,
      email: user.email,
    };
  }

  private async getActiveUser(email: string) {
    const user = await this.users.findByEmail(email);
    if (!user || !user.isActive) {
      throw new HttpError(401, 'Invalid email or password');
    }

    return user;
  }

  private async verifyPassword(user: any, password: string) {
    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpError(401, 'Invalid email or password');
    }
  }

  private hidePassword(user: any) {
    const safeUser = { ...user };
    delete safeUser.password;
    return safeUser;
  }

  private getSecret(): string {
    return process.env.JWT_SECRET || 'change-me';
  }

  private getSignOptions(): SignOptions {
    return {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    } as SignOptions;
  }
}

export default AuthService;
