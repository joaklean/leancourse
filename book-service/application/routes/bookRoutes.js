const { Router } = require('express');
const  BookController  = require('../controllers/bookController');
const verifyToken = require("../middlewares/authMiddlewares");
const rateLimitMiddleware = require("../middlewares/rateLimitMiddlewares");
const MongoBookRepository = require('../repositories/mongo-book.repository');

const bookRepository = new MongoBookRepository();

const router = Router();

router.use(verifyToken, rateLimitMiddleware);

router.get('/books', BookController.getAll);
router.get('/books/:id', BookController.getById);
router.post('/books', BookController.create);
router.put('/books/:id', BookController.update);
router.delete('/books/:id', BookController.delete);

router.post('/api/books/updatedAuthor', async (req, res) => {
    const { authorId, bookId } = req.body;
    console.log(`Received notification for author creation: ${authorId}`);

    try {
        await bookRepository.updateAuthorId(bookId, authorId);
        res.status(200).send('Author creation notification processed successfully');
    } catch (error) {
        console.error('Error updating author ID in book:', error);
        res.status(500).send('Failed to process author creation notification');
    }});

module.exports = router;
