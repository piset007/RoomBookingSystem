import { BookingStatus } from '../enums/BookingStatus';
import BaseModel from './BaseModel';

export class Booking extends BaseModel {
  public userId: number;
  public roomId: number;
  public startTime: Date;
  public endTime: Date;
  public purpose: string | null;
  public subjectId: number | null;
  public status: BookingStatus;
  public approvedBy: number | null;
  public approvedAt: Date | null;

  constructor(
    userId = 0,
    roomId = 0,
    startTime = new Date(),
    endTime = new Date(),
    purpose: string | null = null,
    subjectId: number | null = null,
    status = BookingStatus.PENDING,
    approvedBy: number | null = null,
    approvedAt: Date | null = null,
  ) {
    super();
    this.userId = userId;
    this.roomId = roomId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.purpose = purpose;
    this.subjectId = subjectId;
    this.status = status;
    this.approvedBy = approvedBy;
    this.approvedAt = approvedAt;
  }
}

export default Booking;
