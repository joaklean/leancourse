const { Router } = require('express');
const rateLimitMiddleware = require('../middlewares/rateLimitMiddlewares');
const authMiddleware = require('../middlewares/authMiddlewares');
const userController = require('../controllers/userController');

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/protected', authMiddleware, rateLimitMiddleware, userController.protected);

module.exports = router;
