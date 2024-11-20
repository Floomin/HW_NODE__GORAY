import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../application/services/UserService';
import { User } from '../../domain/models/User';

const userService = new UserService();

// Register a new user
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const newUser: User = req.body;

    // Use UserService to register a new user
    const createdUser = await userService.registerUser(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

// Get user details by email
export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email } = req.params;

    // Use UserService to find a user by email
    const user = await userService.getUserByEmail(email);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
