import { users } from '../storage.js';
import { randomUUID } from 'crypto';

export const registerUser = (req, res) => {
  const { email, name, password } = req.body;

  const newUser = {
    id: randomUUID(),
    email: email,
    name: name,
    password: password
  };

  users.push(newUser);
  res.status(201).json(newUser);
};
