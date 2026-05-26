import { Response } from 'express';
import HttpError from '../errors/HttpError';

export abstract class BaseController {
  protected sendOk(res: Response, data: unknown) {
    res.json(data);
  }

  protected sendCreated(res: Response, data: unknown) {
    res.status(201).json(data);
  }

  protected sendNoContent(res: Response) {
    res.status(204).send();
  }

  protected ensureFound(entity: unknown, message: string) {
    if (!entity) {
      throw new HttpError(404, message);
    }

    return entity;
  }

  protected ensureDeleted(deleted: boolean, message: string) {
    if (!deleted) {
      throw new HttpError(404, message);
    }
  }
}

export default BaseController;
