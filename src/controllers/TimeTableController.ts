import { Request, Response } from 'express';
import TimeTableService from '../services/TimeTableService';
import asyncHandler from '../utils/asyncHandler';
import { parseId } from '../utils/request';
import BaseController from './BaseController';

export class TimeTableController extends BaseController {
  private service = new TimeTableService();

  public index = asyncHandler(async (_req: Request, res: Response) => {
    this.sendOk(res, await this.service.getTimeTables());
  });

  public show = asyncHandler(async (req: Request, res: Response) => {
    this.sendOk(res, await this.findTimeTable(req));
  });

  public byRoom = asyncHandler(async (req: Request, res: Response) => {
    this.sendOk(res, await this.service.getTimeTablesByRoom(this.getRoomId(req)));
  });

  public store = asyncHandler(async (req: Request, res: Response) => {
    this.sendCreated(res, await this.service.createTimeTable(req.body));
  });

  public update = asyncHandler(async (req: Request, res: Response) => {
    this.sendOk(res, await this.updateTimeTable(req));
  });

  public destroy = asyncHandler(async (req: Request, res: Response) => {
    await this.deleteTimeTable(req);
    this.sendNoContent(res);
  });

  private getId(req: Request): number {
    return parseId(req.params.id);
  }

  private getRoomId(req: Request): number {
    return parseId(req.params.roomId, 'roomId');
  }

  private async findTimeTable(req: Request) {
    return this.ensureFound(await this.service.getTimeTable(this.getId(req)), 'Time table not found');
  }

  private async updateTimeTable(req: Request) {
    return this.ensureFound(await this.service.updateTimeTable(this.getId(req), req.body), 'Time table not found');
  }

  private async deleteTimeTable(req: Request) {
    this.ensureDeleted(await this.service.deleteTimeTable(this.getId(req)), 'Time table not found');
  }
}

export default TimeTableController;
