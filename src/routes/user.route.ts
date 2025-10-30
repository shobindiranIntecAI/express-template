import { getUserById } from '@/controllers/user';
import { Router } from 'express';

const router = Router();

router.route('/:userId').get(getUserById);

export default router;
