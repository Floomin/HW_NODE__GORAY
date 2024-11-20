// User model that represents a user in the system
export interface User {
  id: string; // Unique identifier for the user (UUID)
  email: string; // User's email address
  name: string; // User's name
  password: string; // User's hashed password (for security)
}
