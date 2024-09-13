const IAuthorRepository = require('../../domain/interfaces/authorRepository.interface');
const Author = require('../application/models/mongo/Author-mongo.model'); // Adjust the path if needed

class MongoAuthorRepository extends IAuthorRepository {
    async getAll() {
        return await Author.find();
    }

    async create(author) {
        const newAuthor = new Author(author);
        return await newAuthor.save();
    }

    async getById(id) {
        return await Author.findById(id);
    }

    async update(id, author) {
        return await Author.findByIdAndUpdate(id, author, { new: true });
    }

    async delete(id) {
        return await Author.findByIdAndDelete(id);
    }
}

module.exports = MongoAuthorRepository;
