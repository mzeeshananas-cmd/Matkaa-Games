import { Router } from 'express';
import { forgotPassword, login, register, resetPassword } from './auth.controller.js';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  loginSchema,
  registerSchema,
  validateBody,
} from './auth.validation.js';

const router = Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/forgot-password', validateBody(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validateBody(resetPasswordSchema), resetPassword);

export default router;