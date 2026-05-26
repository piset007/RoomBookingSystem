import { BookingStatus } from '../enums/BookingStatus';
import BookingRepository from '../repositories/BookingRepository';
import HttpError from '../errors/HttpError';

export interface CreateBookingInput {
  userId: number;
  roomId: number;
  startTime: Date;
  endTime: Date;
  status?: BookingStatus;
}

export class BookingService {
  private bookings = new BookingRepository();

  public getBookings() {
    return this.bookings.findAll();
  }

  public getBooking(id: number) {
    return this.bookings.findById(id);
  }

  public async createBooking(data: CreateBookingInput) {
    this.ensureValidDates(data);
    this.ensureValidRange(data);
    await this.ensureRoomIsFree(data);

    return this.bookings.create({
      ...data,
      status: data.status || BookingStatus.PENDING,
    });
  }

  public updateBooking(id: number, data: UpdateBookingInput) {
    return this.bookings.update(id, data);
  }

  public deleteBooking(id: number) {
    return this.bookings.delete(id);
  }

  private ensureValidRange(data: CreateBookingInput): void {
    if (data.startTime >= data.endTime) {
      throw new HttpError(400, 'Booking start time must be before end time');
    }
  }

  private ensureValidDates(data: CreateBookingInput): void {
    if (Number.isNaN(data.startTime.getTime()) || Number.isNaN(data.endTime.getTime())) {
      throw new HttpError(400, 'Booking start time and end time must be valid dates');
    }
  }

  private async ensureRoomIsFree(data: CreateBookingInput) {
    const conflict = await this.bookings.findOverlappingActive(data.roomId, data.startTime, data.endTime);
    if (conflict) {
      throw new HttpError(409, 'Room is already booked for this time range');
    }
  }
}

export interface UpdateBookingInput {
  userId?: number;
  roomId?: number;
  startTime?: Date;
  endTime?: Date;
  status?: BookingStatus;
}

export default BookingService;
