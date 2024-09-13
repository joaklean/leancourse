const { Router } = require('express');
const rateLimitMiddleware = require('../application/middlewares/rateLimitMiddlewares');
const authMiddleware = require('../application/middlewares/authMiddlewares');
const userController = require('../application/controllers/userController');

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/protected', authMiddleware, rateLimitMiddleware, userController.protected);

module.exports = router;
