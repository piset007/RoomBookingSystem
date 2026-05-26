import { Request, Response } from 'express';
import UserService from '../services/UserService';
import asyncHandler from '../utils/asyncHandler';
import { parseId } from '../utils/request';
import BaseController from './BaseController';

export class UserController extends BaseController {
  protected service = new UserService();

  public index = asyncHandler(async (_req: Request, res: Response) => {
    const users = await this.service.getUsers();
    this.sendOk(res, users);
  });

  public show = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.findUser(req);
    this.sendOk(res, user);
  });

  public store = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.service.createUser(req.body);
    this.sendCreated(res, user);
  });

  public update = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.updateUser(req);
    this.sendOk(res, user);
  });

  public destroy = asyncHandler(async (req: Request, res: Response) => {
    await this.deleteUser(req);
    this.sendNoContent(res);
  });

  private getId(req: Request): number {
    return parseId(req.params.id);
  }

  private async findUser(req: Request) {
    return this.ensureFound(await this.service.getUser(this.getId(req)), 'User not found');
  }

  private async updateUser(req: Request) {
    return this.ensureFound(await this.service.updateUser(this.getId(req), req.body), 'User not found');
  }

  private async deleteUser(req: Request) {
    this.ensureDeleted(await this.service.deleteUser(this.getId(req)), 'User not found');
  }
}

export default UserController;
