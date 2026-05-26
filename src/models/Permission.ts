import BaseModel from './BaseModel';

export class Permission extends BaseModel {
  public action: string;
  public description: string | null;

  constructor(action = '', description: string | null = null) {
    super();
    this.action = action;
    this.description = description;
  }
}

export default Permission;
