import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import asyncHandler from '../utils/asyncHandler';
import HttpError from '../errors/HttpError';
import BaseController from './BaseController';

export class AuthController extends BaseController {
  private service = new AuthService();

  public login = asyncHandler(async (req: Request, res: Response) => {
    const credentials = this.getCredentials(req);
    const user = await this.service.authenticate(credentials.email, credentials.password);
    const token = this.service.issueToken(user);

    this.sendOk(res, { token, user });
  });

  private getCredentials(req: Request) {
    const { email, password } = req.body;
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new HttpError(400, 'Email and password are required');
    }

    return { email, password };
  }
}

export default AuthController;
