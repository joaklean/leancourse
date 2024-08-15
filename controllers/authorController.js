const AuthorService  = require('../services/authorServices');
const {AuthorSchema} = require('../schemas/validationSchemas');
const { z } = require('zod');

const AuthorController = {
    getAll: async (req, res) => {
        res.json(await AuthorService.getAll());
    },
    getById: async (req, res) => {
        const { id } = req.params;
        const author = await AuthorService.getById(id);
        if (author) {
            res.json(author);
        } else {
            res.status(404).json({ message: "Author not found" });
        }
    },
    create: (req, res) => {
        try {
            const data = AuthorSchema.parse(req.body);
            const newAuthor = AuthorService.create(data);
            res.status(201).json(newAuthor);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ errors: error.errors });
            }
        }
    },
    update: (req, res) => {
        try {
            const { id } = req.params;
            const data = AuthorSchema.parse(req.body);
            const updatedAuthor = AuthorService.update(id, data);
            if (updatedAuthor) {
                res.json(updatedAuthor);
            } else {
                res.status(404).json({ message: "Author not found" });
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ errors: error.errors });
            }
        }
    },
    delete: (req, res) => {
        const { id } = req.params;
        const deletedAuthor = AuthorService.delete(id);
        if (deletedAuthor) {
            res.json(deletedAuthor);
        } else {
            res.status(404).json({ message: "Author not found" });
        }
    }
};

module.exports = AuthorController
