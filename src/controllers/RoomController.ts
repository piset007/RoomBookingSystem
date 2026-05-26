import { Request, Response } from 'express';
import RoomService from '../services/RoomService';
import asyncHandler from '../utils/asyncHandler';
import { parseId } from '../utils/request';
import BaseController from './BaseController';

export class RoomController extends BaseController {
  private service = new RoomService();

  public index = asyncHandler(async (_req: Request, res: Response) => {
    this.sendOk(res, await this.service.getRooms());
  });

  public available = asyncHandler(async (_req: Request, res: Response) => {
    this.sendOk(res, await this.service.getAvailableRooms());
  });

  public show = asyncHandler(async (req: Request, res: Response) => {
    this.sendOk(res, await this.findRoom(req));
  });

  public store = asyncHandler(async (req: Request, res: Response) => {
    this.sendCreated(res, await this.service.createRoom(req.body));
  });

  public update = asyncHandler(async (req: Request, res: Response) => {
    this.sendOk(res, await this.updateRoom(req));
  });

  public destroy = asyncHandler(async (req: Request, res: Response) => {
    await this.deleteRoom(req);
    this.sendNoContent(res);
  });

  private getId(req: Request): number {
    return parseId(req.params.id);
  }

  private async findRoom(req: Request) {
    return this.ensureFound(await this.service.getRoom(this.getId(req)), 'Room not found');
  }

  private async updateRoom(req: Request) {
    return this.ensureFound(await this.service.updateRoom(this.getId(req), req.body), 'Room not found');
  }

  private async deleteRoom(req: Request) {
    this.ensureDeleted(await this.service.deleteRoom(this.getId(req)), 'Room not found');
  }
}

export default RoomController;
