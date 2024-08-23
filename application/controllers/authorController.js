const {AuthorSchema} = require('../schemas/validationSchemas');
const { z } = require('zod');
const AuthorUseCase = require('../../domain/usecases/author.usecase');
const MongoAuthorRepository = require('../repositories/mongo-author.repository');

const authorUseCase = new AuthorUseCase(new MongoAuthorRepository());

const AuthorController = {
    create: async (req, res) => {
        try {
            const data = AuthorSchema.parse(req.body);
            const author = await authorUseCase.createAuthor(data);
            res.status(201).json(author);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ errors: error.errors });
            }
            res.status(400).json({ message: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const authors = await authorUseCase.getAllAuthors();
            res.status(200).json(authors);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get authors' });
        }
    },
    getById: async (req, res) => {
        try {
            const author = await authorUseCase.getAuthorById(req.params.id);
            if (!author) {
                return res.status(404).json({ message: 'Author not found' });
            }
            res.status(200).json(author);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get author' });
        }
    },
    update: async (req, res) => {
        try {
            const data = AuthorSchema.parse(req.body);
            const updatedAuthor = await authorUseCase.updateAuthor(req.params.id, data);
            if (updatedAuthor) {
                res.status(200).json(updatedAuthor);
            } else {
                res.status(404).json({ message: "Author not found" });
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
            const deletedAuthor = await authorUseCase.deleteAuthor(req.params.id);
            if (deletedAuthor) {
                res.status(204).json(deletedAuthor);
            } else {
                res.status(404).json({ message: "Author not found" });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete author' });
        }
    }
};

module.exports = AuthorController;
