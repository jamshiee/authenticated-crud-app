import express from 'express'
import { signupUser, signinUser } from '../controller/authController.js';

const router = express.Router();

router.post('/signup',signupUser)
router.post('/signin',signinUser)

export default router