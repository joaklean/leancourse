const { Router } = require('express');
const  BookController  = require('../controllers/bookController');
const verifyToken = require("../middlewares/authMiddlewares");
const rateLimitMiddleware = require("../middlewares/rateLimitMiddlewares");

const router = Router();

router.use(verifyToken, rateLimitMiddleware);

router.get('/books', BookController.getAll);
router.get('/books/:id', BookController.getById);
router.post('/books', BookController.create);
router.put('/books/:id', BookController.update);
router.delete('/books/:id', BookController.delete);

router.post('/books/updatedAuthor', BookController.updateAuthor);

module.exports = router;
