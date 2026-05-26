import { IEntity } from '../interfaces/IEntity';

export abstract class BaseModel implements IEntity {
  public id: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(id = 0) {
    this.id = id;
  }
}

export default BaseModel;
