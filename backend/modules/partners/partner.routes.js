import { Router } from 'express';
import { requireAuth } from '../../src/middlewares/auth.middleware.js';
import { getMyPartner, updateMyPartner } from './partner.control.js';
import { validatePartnerUpdate } from './partner.validation.js';

const router = Router();
router.use(requireAuth);
router.get('/me', getMyPartner);
router.patch('/me', validatePartnerUpdate, updateMyPartner);

export default router;
