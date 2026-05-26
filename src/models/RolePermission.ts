import { Role } from '../enums/Role';
import BaseModel from './BaseModel';

export class RolePermission extends BaseModel {
  public role: Role;
  public permissionId: number;

  constructor(role = Role.STUDENT, permissionId = 0) {
    super();
    this.role = role;
    this.permissionId = permissionId;
  }
}

export default RolePermission;
