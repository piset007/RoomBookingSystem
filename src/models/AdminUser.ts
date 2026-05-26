import { Role } from '../enums/Role';
import User from './User';

export class AdminUser extends User {
  declare role: Role.ADMIN;

  public hasPermission(): boolean {
    return true;
  }
}

export default AdminUser;
