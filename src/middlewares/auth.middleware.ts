import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing bearer token' });
    return;
  }

  try {
    req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET || 'change-me') as AuthenticatedRequest['user'];
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
