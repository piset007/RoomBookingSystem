import { Role } from '../enums/Role';
import BaseModel from './BaseModel';

export class RoomAccessRule extends BaseModel {
  public roomId: number;
  public allowedRole: Role;
  public requiresApproval: boolean;
  public approverId: number | null;

  constructor(roomId = 0, allowedRole = Role.STUDENT, requiresApproval = false, approverId: number | null = null) {
    super();
    this.roomId = roomId;
    this.allowedRole = allowedRole;
    this.requiresApproval = requiresApproval;
    this.approverId = approverId;
  }
}

export default RoomAccessRule;
