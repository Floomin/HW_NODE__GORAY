import { User } from '../../domain/models/User';
import { promises as fs } from 'fs';
import path from 'path';

// Repository for managing users
export class UserRepository {
  private filePath: string;

  constructor() {
    // Set the path to the JSON file where users are stored
    this.filePath = path.join(__dirname, '../../resources/users.store.json');
  }

  // Get a user by their email address
  public async getByEmail(email: string): Promise<User | null> {
    const users = await this.getAllUsers();
    return users.find((user) => user.email === email) || null;
  }

  // Save a new user to the JSON file
  public async save(user: User): Promise<User> {
    const users = await this.getAllUsers();
    users.push(user);
    await fs.writeFile(this.filePath, JSON.stringify(users, null, 2));
    return user;
  }

  // Get all users from the JSON file
  private async getAllUsers(): Promise<User[]> {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data) as User[];
  }
}
