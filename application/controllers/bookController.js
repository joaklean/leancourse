const {BookSchema} = require('../schemas/validationSchemas');
const { z } = require('zod');
const BookUseCase = require('../../domain/usecases/book.usecase');
const MongoBookRepository = require('../repositories/mongo-book.repository');

const bookUseCase = new BookUseCase(new MongoBookRepository());


const BookController = {
    create: async (req, res) => {
        try {
            const data = BookSchema.parse(req.body);
            const book = await bookUseCase.createBook(data);
            res.status(201).json(book);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ errors: error.errors });
            }
            res.status(400).json({ message: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const books = await bookUseCase.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get books' });
        }
    },
    getById: async (req, res) => {
        try {
            const book = await bookUseCase.getBookById(req.params.id);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get book' });
        }
    },
    update: async (req, res) => {
        try {
            const data = BookSchema.parse(req.body);
            const updatedBook = await bookUseCase.updateBook(req.params.id, data);
            if (updatedBook) {
                res.status(200).json(updatedBook);
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ errors: error.errors });
            }
            res.status(400).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const deletedBook = await bookUseCase.deleteBook(req.params.id);
            if (deletedBook) {
                res.status(204).json(deletedBook);
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete book' });
        }
    }
};

module.exports = BookController;
