import { Router } from 'express';
import userRouter from './user.route';

const router = Router();

router.use('/user', userRouter);

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default router;
