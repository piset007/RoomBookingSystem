import { Role } from '../enums/Role';
import User from './User';

export class TeacherUser extends User {
  declare role: Role.TEACHER;

  public hasPermission(action: string): boolean {
    return ['booking:create', 'booking:read', 'booking:cancel'].includes(action);
  }
}

export default TeacherUser;
