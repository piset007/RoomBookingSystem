import { NextFunction, Response } from 'express';
import { Role } from '../enums/Role';
import { AuthenticatedRequest } from './auth.middleware';

export const roleMiddleware = (...roles: Role[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role as Role)) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    next();
  };
};

export default roleMiddleware;
