import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { verifyToken } from '../middlewares/authMiddlewares';
import { rateLimitMiddleware } from '../middlewares/rateLimitMiddlewares';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/protected', verifyToken, rateLimitMiddleware, UserController.protected);

export default router;
