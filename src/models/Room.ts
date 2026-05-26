import { RoomStatus } from '../enums/RoomStatus';
import BaseModel from './BaseModel';

export enum RoomAccessPolicy {
  OPEN = 'open',
  TEACHER_ONLY = 'teacher_only',
  REQUIRE_TEACHER_APPROVAL = 'require_teacher_approval',
}

export class Room extends BaseModel {
  public name: string;
  public capacity: number;
  public location: string;
  public status: RoomStatus;
  public accessPolicy: RoomAccessPolicy;

  constructor(
    name = '',
    capacity = 0,
    location = '',
    status = RoomStatus.AVAILABLE,
    accessPolicy = RoomAccessPolicy.OPEN,
  ) {
    super();
    this.name = name;
    this.capacity = capacity;
    this.location = location;
    this.status = status;
    this.accessPolicy = accessPolicy;
  }
}

export default Room;
