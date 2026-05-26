import { NextFunction, Request, Response } from 'express';

export type Validator = (body: unknown) => string[];

export const validateMiddleware = (validator: Validator) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = validator(req.body);
    if (errors.length > 0) {
      res.status(422).json({ errors });
      return;
    }

    next();
  };
};

export default validateMiddleware;
