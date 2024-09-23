import { users } from '../storage.js';
import { randomUUID } from 'crypto';
import { vallidateEmail, validatePassword } from '../middleware/validation.js';

export const registerUser = (req, res) => {
  const { email, name, password } = req.body;

  if (!vallidateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!validatePassword(password)) {
    return res
      .status(400)
      .json({
        error:
          'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',
      });
  }

  const newUser = {
    id: randomUUID(),
    email: email,
    name: name,
    password: password
  };

  users.push(newUser);
  res.status(201).json(newUser);
};
