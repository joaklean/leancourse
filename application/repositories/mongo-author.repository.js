const IAuthorRepository = require('../../domain/gateways/author.gateway');
const Author = require('../models/Author');

class AuthorRepository extends IAuthorRepository {
    async getAll() {
        return Author.find();
    }

    async create(author) {
        const newAuthor = new Author(author);
        return newAuthor.save();
    }
    async getById(id) {
        return Author.findById(id);
    }
    async update(id, updatedAuthor) {
        return Author.findByIdAndUpdate(id, updatedAuthor);
    }
    async delete(id) {
        return Author.findByIdAndDelete(id);
    }
}

module.exports = AuthorRepository;
