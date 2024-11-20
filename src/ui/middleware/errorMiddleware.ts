import { Request, Response, NextFunction } from 'express';

// Middleware for handling errors
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error(err.stack);

  if (err.isJoi) {
    // Handling Joi validation errors
    res.status(400).json({ error: err.details[0].message });
    return;
  }

  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .json({ error: err.message || 'An unexpected error occurred' });
};
