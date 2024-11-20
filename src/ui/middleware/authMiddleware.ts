import { Request, Response, NextFunction } from 'express';

// Middleware for checking the presence of the x-user-id header
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    res.status(401).json({ error: 'User ID is required' });
    return;
  }

  // Attach userId to the request object
  req.userId = userId;
  next();
};

// Extend the Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
