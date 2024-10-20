const IBookRepository = require('../../domain/interfaces/bookRepository.interface');
const Book = require('../models/mongo/Book-mongo.model');

class MongoBookRepository extends IBookRepository {
    async getAll() {
        return await Book.find();
    }

    async create(book) {
        const newBook = new Book(book);
        return await newBook.save();
    }

    async getById(id) {
        return await Book.findById(id);
    }

    async update(id, book) {
        return await Book.findByIdAndUpdate(id, book, { new: true });
    }

    async delete(id) {
        return await Book.findByIdAndDelete(id);
    }

    async updateAuthorId(bookId, authorId) {
        return await Book.findByIdAndUpdate(bookId, { author: authorId });
    }
}

module.exports = MongoBookRepository;
