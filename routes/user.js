import express from 'express';
import { registerUser } from '../controllers/userController.js';
import { validateRegister } from '../middleware/validation.js';

//Create a new router object
const router = express.Router();

//POST /api/register - Register a new user
router.post('/register', validateRegister, registerUser);

export default router;
