const {z}  = require('zod');

const BookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    genre: z.string().min(1, "Genre is required"),
    year: z.number().int().min(0, "Year must be a positive integer"),
    authorId: z.string().uuid("Invalid author ID format")
});

module.exports = {
    BookSchema
}