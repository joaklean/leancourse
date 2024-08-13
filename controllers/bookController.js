import { BookService } from '../services/bookServices';
import { BookSchema } from '../schemas/validationSchemas';

export const BookController = {
    getAll: (req, res) => {
        res.json(BookService.getAll());
    },
    getById: (req, res) => {
        const { id } = req.params;
        const book = BookService.getById(id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    },
    create: (req, res) => {
        try {
            const data = BookSchema.parse(req.body);
            const newBook = BookService.create(data);
            res.status(201).json(newBook);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ errors: error.errors });
            }
        }
    },
    update: (req, res) => {
        try {
            const { id } = req.params;
            const data = BookSchema.parse(req.body);
            const updatedBook = BookService.update(id, data);
            if (updatedBook) {
                res.json(updatedBook);
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ errors: error.errors });
            }
        }
    },
    delete: (req, res) => {
        const { id } = req.params;
        const deletedBook = BookService.delete(id);
        if (deletedBook) {
            res.json(deletedBook);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    }
};
