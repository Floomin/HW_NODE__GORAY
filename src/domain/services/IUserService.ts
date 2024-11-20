import { User } from '../models/User';

// Interface that defines the operations for managing users
export interface IUserService {
  // Register a new user
  registerUser(user: User): Promise<User>;

  // Find a user by their email
  getUserByEmail(email: string): Promise<User | null>;
}
