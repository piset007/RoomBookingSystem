import { RoomStatus } from '../enums/RoomStatus';
import RoomRepository from '../repositories/RoomRepository';

export interface CreateRoomInput {
  name: string;
  capacity: number;
  location: string;
  status?: RoomStatus;
}

export interface UpdateRoomInput {
  name?: string;
  capacity?: number;
  location?: string;
  status?: RoomStatus;
}

export class RoomService {
  private rooms = new RoomRepository();

  public getRooms() {
    return this.rooms.findAll();
  }

  public getAvailableRooms() {
    return this.rooms.findAvailable();
  }

  public getRoom(id: number) {
    return this.rooms.findById(id);
  }

  public createRoom(data: CreateRoomInput) {
    return this.rooms.create(data);
  }

  public updateRoom(id: number, data: UpdateRoomInput) {
    return this.rooms.update(id, data);
  }

  public deleteRoom(id: number) {
    return this.rooms.delete(id);
  }
}

export default RoomService;
