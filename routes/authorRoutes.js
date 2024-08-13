import { Router } from 'express';
import { AuthorController } from '../controllers/authorController';
import {verifyToken} from "../middlewares/authMiddlewares";
import {rateLimitMiddleware} from "../middlewares/rateLimitMiddlewares";

const router = Router();

router.use(verifyToken, rateLimitMiddleware);

router.get('/authors', AuthorController.getAll);
router.get('/authors/:id', AuthorController.getById);
router.post('/authors', AuthorController.create);
router.put('/authors/:id', AuthorController.update);
router.delete('/authors/:id', AuthorController.delete);

export default router;
