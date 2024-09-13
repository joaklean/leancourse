const { Router } = require('express');
const  AuthorController  = require('../application/controllers/authorController');
const verifyToken = require("../application/middlewares/authMiddlewares");
const rateLimitMiddleware = require("../application/middlewares/rateLimitMiddlewares");

const router = Router();

router.use(verifyToken, rateLimitMiddleware);

router.get('/authors', AuthorController.getAll);
router.get('/authors/:id', AuthorController.getById);
router.post('/authors', AuthorController.create);
router.put('/authors/:id', AuthorController.update);
router.delete('/authors/:id', AuthorController.delete);

module.exports = router;
