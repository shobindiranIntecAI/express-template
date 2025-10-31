import { registerUserMongo, registerUserPostgres } from '@/controllers/user';
import { Router } from 'express';

const router = Router();

router.route('/mongo').post(registerUserMongo);
router.route('/postgres').post(registerUserPostgres)

export default router;
