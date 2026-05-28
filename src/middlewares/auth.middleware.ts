import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
    email: string;
  };
}

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;
  const secret = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  if (!secret) {
    return res.status(500).json({ error: 'JWT secret is not configured' });
  }

  try {
    const decoded = jwt.verify(token, secret) as { id: number; role: string; email: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default authenticate;
