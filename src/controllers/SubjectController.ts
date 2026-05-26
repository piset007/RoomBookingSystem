import { Request, Response } from 'express';
import SubjectService from '../services/SubjectService';
import asyncHandler from '../utils/asyncHandler';
import { parseId } from '../utils/request';
import BaseController from './BaseController';

export class SubjectController extends BaseController {
  private service = new SubjectService();

  public index = asyncHandler(async (_req: Request, res: Response) => {
    this.sendOk(res, await this.service.getSubjects());
  });

  public show = asyncHandler(async (req: Request, res: Response) => {
    this.sendOk(res, await this.findSubject(req));
  });

  public store = asyncHandler(async (req: Request, res: Response) => {
    this.sendCreated(res, await this.service.createSubject(req.body));
  });

  public update = asyncHandler(async (req: Request, res: Response) => {
    this.sendOk(res, await this.updateSubject(req));
  });

  public destroy = asyncHandler(async (req: Request, res: Response) => {
    await this.deleteSubject(req);
    this.sendNoContent(res);
  });

  private getId(req: Request): number {
    return parseId(req.params.id);
  }

  private async findSubject(req: Request) {
    return this.ensureFound(await this.service.getSubject(this.getId(req)), 'Subject not found');
  }

  private async updateSubject(req: Request) {
    return this.ensureFound(await this.service.updateSubject(this.getId(req), req.body), 'Subject not found');
  }

  private async deleteSubject(req: Request) {
    this.ensureDeleted(await this.service.deleteSubject(this.getId(req)), 'Subject not found');
  }
}

export default SubjectController;
