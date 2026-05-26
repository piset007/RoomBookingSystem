import { Role } from '../enums/Role';
import User from './User';

export class StudentUser extends User {
  declare role: Role.STUDENT;

  public hasPermission(action: string): boolean {
    return ['booking:read'].includes(action);
  }
}

export default StudentUser;
