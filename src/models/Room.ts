import { RoomStatus } from '../enums/RoomStatus';
import BaseModel from './BaseModel';

export class Room extends BaseModel {
  public name: string;
  public capacity: number;
  public location: string;
  public status: RoomStatus;

  constructor(name = '', capacity = 0, location = '', status = RoomStatus.AVAILABLE) {
    super();
    this.name = name;
    this.capacity = capacity;
    this.location = location;
    this.status = status;
  }
}

export default Room;
