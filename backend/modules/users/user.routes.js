import { Router } from 'express';
import { getMe, updateMe } from './user.controller.js';
import { requireAuth } from '../../src/middlewares/auth.middleware.js';
import { validateUpdateProfile } from './user.validation.js';

const router = Router();

router.use(requireAuth);
router.get('/me', getMe);
router.patch('/me', validateUpdateProfile, updateMe);

export default router;