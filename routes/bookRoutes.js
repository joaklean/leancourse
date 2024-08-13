import { Router } from 'express';
import { BookController } from '../controllers/bookController';
import {verifyToken} from "../middlewares/authMiddlewares";
import {rateLimitMiddleware} from "../middlewares/rateLimitMiddlewares";

const router = Router();

router.use(verifyToken, rateLimitMiddleware);

router.get('/books', BookController.getAll);
router.get('/books/:id', BookController.getById);
router.post('/books', BookController.create);
router.put('/books/:id', BookController.update);
router.delete('/books/:id', BookController.delete);

export default router;
