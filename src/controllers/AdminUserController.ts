import { Request, Response } from 'express';
import { Role } from '../enums/Role';
import asyncHandler from '../utils/asyncHandler';
import UserController from './UserController';

export class AdminUserController extends UserController {
  public index = asyncHandler(async (_req: Request, res: Response) => {
    const admins = await this.service.getUsersByRole(Role.ADMIN);
    this.sendOk(res, admins);
  });
}

export default AdminUserController;
