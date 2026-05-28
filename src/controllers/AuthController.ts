import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import asyncHandler from '../utils/asyncHandler';
import HttpError from '../errors/HttpError';
import { Role } from '../enums/Role';
import BaseController from './BaseController';

export class AuthController extends BaseController {
  private service = new AuthService();

  public login = asyncHandler(async (req: Request, res: Response) => {
    const credentials = this.getCredentials(req);
    const user = await this.service.authenticate(credentials.email, credentials.password);
    const token = this.service.issueToken(user);

    this.sendOk(res, { token, user });
  });

  public register = asyncHandler(async (req: Request, res: Response) => {
    const payload = this.getRegisterPayload(req);
    const user = await this.service.register(payload);
    const token = this.service.issueToken(user);

    this.sendCreated(res, { token, user });
  });

  private getCredentials(req: Request) {
    const { email, password } = req.body;
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new HttpError(400, 'Email and password are required');
    }

    return { email, password };
  }

  private getRegisterPayload(req: Request) {
    const fullName = typeof req.body.fullName === 'string' ? req.body.fullName : typeof req.body.FullName === 'string' ? req.body.FullName : undefined;
    const email = typeof req.body.email === 'string' ? req.body.email : typeof req.body.Email === 'string' ? req.body.Email : undefined;
    const password = typeof req.body.password === 'string' ? req.body.password : typeof req.body.Password === 'string' ? req.body.Password : undefined;
    const role = typeof req.body.role === 'string' ? req.body.role : typeof req.body.Role === 'string' ? req.body.Role : undefined;
    const department = typeof req.body.department === 'string' ? req.body.department : typeof req.body.Department === 'string' ? req.body.Department : null;

    if (!fullName || !email || !password) {
      throw new HttpError(400, 'Full name, email, and password are required');
    }

    if (role !== undefined && !Object.values(Role).includes(role as Role)) {
      throw new HttpError(400, 'Invalid role');
    }

    return {
      fullName,
      email,
      password,
      role: role ? (role as Role) : Role.STUDENT,
      department,
    };
  }
}

export default AuthController;
