const { Router } = require('express');
const UserController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddlewares');
const rateLimitMiddleware = require('../middlewares/rateLimitMiddlewares');

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/protected', verifyToken, rateLimitMiddleware, UserController.protected);

module.exports = router;
