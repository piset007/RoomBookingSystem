import { BookingStatus } from '../enums/BookingStatus';
import BaseModel from './BaseModel';

export class Booking extends BaseModel {
  public userId: number;
  public roomId: number;
  public startTime: Date;
  public endTime: Date;
  public status: BookingStatus;

  constructor(userId = 0, roomId = 0, startTime = new Date(), endTime = new Date(), status = BookingStatus.PENDING) {
    super();
    this.userId = userId;
    this.roomId = roomId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
  }
}

export default Booking;
