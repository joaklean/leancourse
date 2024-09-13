const {z}  = require('zod');

const AuthorSchema = z.object({
    name: z.string().min(1, "Name is required"),
    birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid birthdate format (YYYY-MM-DD)")
});

module.exports = {
    AuthorSchema
}