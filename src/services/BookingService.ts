import { BookingStatus } from '../enums/BookingStatus';
import { Role } from '../enums/Role';
import HttpError from '../errors/HttpError';
import { RoomAccessPolicy } from '../models/Room';
import BookingRepository from '../repositories/BookingRepository';
import RoomRepository from '../repositories/RoomRepository';

export interface CreateBookingInput {
  userId: number;
  roomId: number;
  startTime: Date;
  endTime: Date;
  purpose?: string | null;
  subjectId?: number | null;
  status?: BookingStatus;
  approvedBy?: number | null;
  approvedAt?: Date | null;
}

export interface BookingRequester {
  id: number;
  role: string;
}

export class BookingService {
  private bookings = new BookingRepository();
  private rooms = new RoomRepository();

  public getBookings() {
    return this.bookings.findAll();
  }

  public getBooking(id: number) {
    return this.bookings.findById(id);
  }

  public async createBooking(data: CreateBookingInput, requester?: BookingRequester) {
    this.ensureValidDates(data);
    this.ensureValidRange(data);
    this.ensureValidUser(data);
    const room = await this.findBookableRoom(data.roomId);
    await this.ensureRequesterCanBook(data, requester, room);
    await this.ensureRoomIsFree(data);

    return this.bookings.create({
      ...data,
      ...this.getApprovalFields(data, requester, room),
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

  private ensureValidUser(data: CreateBookingInput): void {
    if (!Number.isInteger(data.userId) || data.userId <= 0) {
      throw new HttpError(400, 'A valid booking user is required');
    }
  }

  private async findBookableRoom(roomId: number) {
    const room = await this.rooms.findById(roomId);
    if (!room) {
      throw new HttpError(404, 'Room not found');
    }

    if (room.status !== 'available') {
      throw new HttpError(409, 'Room is not available for booking');
    }

    return room as { id: number; status: string; accessPolicy: RoomAccessPolicy };
  }

  private async ensureRequesterCanBook(
    data: CreateBookingInput,
    requester: BookingRequester | undefined,
    room: { accessPolicy: RoomAccessPolicy },
  ) {
    if (!requester || requester.role !== Role.STUDENT) {
      return;
    }

    if (data.userId !== requester.id) {
      throw new HttpError(403, 'Students can only create bookings for themselves');
    }

    if (room.accessPolicy === RoomAccessPolicy.TEACHER_ONLY) {
      throw new HttpError(403, 'This room can only be booked by teachers');
    }

    await this.ensureStudentFutureBookingLimit(data.userId);
  }

  private async ensureStudentFutureBookingLimit(userId: number) {
    const maxBookings = Number(process.env.STUDENT_MAX_ACTIVE_FUTURE_BOOKINGS || 3);
    const activeFutureBookings = await this.bookings.countFutureActiveByUser(userId);

    if (activeFutureBookings >= maxBookings) {
      throw new HttpError(409, `Students can only have ${maxBookings} active future bookings`);
    }
  }

  private getApprovalFields(
    data: CreateBookingInput,
    requester: BookingRequester | undefined,
    room: { accessPolicy: RoomAccessPolicy },
  ) {
    if (requester?.role === Role.STUDENT) {
      if (room.accessPolicy === RoomAccessPolicy.OPEN) {
        return {
          status: BookingStatus.APPROVED,
          approvedBy: null,
          approvedAt: new Date(),
        };
      }

      return {
        status: BookingStatus.PENDING,
        approvedBy: null,
        approvedAt: null,
      };
    }

    return {
      status: data.status || BookingStatus.PENDING,
      approvedBy: data.approvedBy ?? null,
      approvedAt: data.approvedAt ?? null,
    };
  }
}

export interface UpdateBookingInput {
  userId?: number;
  roomId?: number;
  startTime?: Date;
  endTime?: Date;
  purpose?: string | null;
  subjectId?: number | null;
  status?: BookingStatus;
  approvedBy?: number | null;
  approvedAt?: Date | null;
}

export default BookingService;
