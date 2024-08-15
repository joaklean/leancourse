const { Router } = require('express');
const  AuthorController  = require('../controllers/authorController');
const verifyToken = require("../middlewares/authMiddlewares");
const rateLimitMiddleware = require("../middlewares/rateLimitMiddlewares");

const router = Router();

router.use(verifyToken, rateLimitMiddleware);

router.get('/authors', AuthorController.getAll);
router.get('/authors/:id', AuthorController.getById);
router.post('/authors', AuthorController.create);
router.put('/authors/:id', AuthorController.update);
router.delete('/authors/:id', AuthorController.delete);

module.exports = router;
