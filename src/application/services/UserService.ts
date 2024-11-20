import { IUserService } from '../../domain/services/IUserService';
import { User } from '../../domain/models/User';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { randomUUID } from 'crypto';

// Service for managing users
export class UserService implements IUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // Register a new user
  public async registerUser(user: User): Promise<User> {
    const existingUser = await this.userRepository.getByEmail(user.email);

    if (existingUser) {
      throw new Error('User already exists');
    }
    // Generate a unique ID for the new user
    user.id = randomUUID();

    // Save the new user in the repository
    return await this.userRepository.save(user);
  }

  // Find a user by their email
  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.getByEmail(email);
  }
}
