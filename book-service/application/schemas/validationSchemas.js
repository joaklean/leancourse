const {z}  = require('zod');

const AuthorSchema = z.object({
    name: z.string().min(1, "Name is required"),
    birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid birthdate format (YYYY-MM-DD)")
});

const AuthorIdSchema = z.object({
    id: z.string().min(1, "Author ID is required")
});

const AuthorInfoOrIdSchema = z.union([AuthorSchema, AuthorIdSchema]);

const BookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    genre: z.string().min(1, "Genre is required"),
    year: z.number().int().min(0, "Year must be a positive integer"),
    author: AuthorInfoOrIdSchema
});

module.exports = {
    BookSchema
}