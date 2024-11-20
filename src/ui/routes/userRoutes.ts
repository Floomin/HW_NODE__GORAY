import { Router } from 'express';
import { registerUser, getUserByEmail } from '../controllers/userController';
import { validateUser } from '../../domain/validation/userValidation';

const router = Router();

// Route for user registration with validation
router.post('/register', validateUser, registerUser);

// Route to get user details by email
router.get('/:email', getUserByEmail);

export default router;
