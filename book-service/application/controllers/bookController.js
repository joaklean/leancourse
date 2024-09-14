const {BookSchema} = require('../schemas/validationSchemas');
const BookUseCase = require('../../domain/usecases/book.usecase');
const MongoBookRepository = require('../repositories/mongo-book.repository');
const AxiosAuthorRepository = require('../repositories/axios-author.repository');
const { NotFoundError } = require('../errors/customErrors');

const bookUseCase = new BookUseCase(new MongoBookRepository(), new AxiosAuthorRepository());

const BookController = {
    create: async (req, res, next) => {
        try {
            const data = BookSchema.parse(req.body);
            const book = await bookUseCase.createBook(data);
            res.status(201).json(book);
        } catch (error) {
            next(error);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const books = await bookUseCase.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const book = await bookUseCase.getBookById(req.params.id);
            if (!book) {
                throw new NotFoundError('Book not found');
            }
            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = BookSchema.parse(req.body);
            const updatedBook = await bookUseCase.updateBook(req.params.id, data);
            if (!updatedBook) {
                throw new NotFoundError('Book not found');
            }
            res.status(200).json(updatedBook);
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const deletedBook = await bookUseCase.deleteBook(req.params.id);
            if (!deletedBook) {
                throw new NotFoundError('Book not found');
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
};

module.exports = BookController;
