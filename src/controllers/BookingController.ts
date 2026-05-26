import { Request, Response } from 'express';
import { BookingStatus } from '../enums/BookingStatus';
import BookingService from '../services/BookingService';
import asyncHandler from '../utils/asyncHandler';
import { parseId } from '../utils/request';
import BaseController from './BaseController';

export class BookingController extends BaseController {
  private service = new BookingService();

  public index = asyncHandler(async (_req: Request, res: Response) => {
    this.sendOk(res, await this.service.getBookings());
  });

  public show = asyncHandler(async (req: Request, res: Response) => {
    this.sendOk(res, await this.findBooking(req));
  });

  public store = asyncHandler(async (req: Request, res: Response) => {
    const booking = await this.service.createBooking(this.getCreateInput(req));
    this.sendCreated(res, booking);
  });

  public update = asyncHandler(async (req: Request, res: Response) => {
    this.sendOk(res, await this.updateBooking(req));
  });

  public destroy = asyncHandler(async (req: Request, res: Response) => {
    await this.deleteBooking(req);
    this.sendNoContent(res);
  });

  private getId(req: Request): number {
    return parseId(req.params.id);
  }

  private getCreateInput(req: Request) {
    return {
      userId: Number(req.body.userId),
      roomId: Number(req.body.roomId),
      startTime: this.parseDate(req.body.startTime),
      endTime: this.parseDate(req.body.endTime),
      purpose: req.body.purpose ?? null,
      subjectId: req.body.subjectId ? Number(req.body.subjectId) : null,
      status: req.body.status as BookingStatus | undefined,
      approvedBy: req.body.approvedBy ? Number(req.body.approvedBy) : null,
      approvedAt: req.body.approvedAt ? this.parseDate(req.body.approvedAt) : null,
    };
  }

  private parseDate(value: unknown): Date {
    return new Date(String(value));
  }

  private async findBooking(req: Request) {
    return this.ensureFound(await this.service.getBooking(this.getId(req)), 'Booking not found');
  }

  private async updateBooking(req: Request) {
    return this.ensureFound(await this.service.updateBooking(this.getId(req), req.body), 'Booking not found');
  }

  private async deleteBooking(req: Request) {
    this.ensureDeleted(await this.service.deleteBooking(this.getId(req)), 'Booking not found');
  }
}

export default BookingController;
