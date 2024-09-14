const {AuthorSchema} = require('../schemas/validationSchemas');
const AuthorUseCase = require('../../domain/usecases/author.usecase');
const MongoAuthorRepository = require('../repositories/mongo-author.repository');
const { NotFoundError } = require('../errors/customErrors');

const authorUseCase = new AuthorUseCase(new MongoAuthorRepository());

const AuthorController = {
    create: async (req, res, next) => {
        try {
            const data = AuthorSchema.parse(req.body);
            const author = await authorUseCase.createAuthor(data);
            res.status(201).json(author);
        } catch (error) {
            next(error);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const authors = await authorUseCase.getAllAuthors();
            res.status(200).json(authors);
        } catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const author = await authorUseCase.getAuthorById(req.params.id);
            if (!author) {
                throw new NotFoundError('Author not found');
            }
            res.status(200).json(author);
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = AuthorSchema.parse(req.body);
            const updatedAuthor = await authorUseCase.updateAuthor(req.params.id, data);
            if (!updatedAuthor) {
                throw new NotFoundError('Author not found');
            }
            res.status(200).json(updatedAuthor);
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const deletedAuthor = await authorUseCase.deleteAuthor(req.params.id);
            if (!deletedAuthor) {
                throw new NotFoundError('Author not found');
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
};

module.exports = AuthorController;
