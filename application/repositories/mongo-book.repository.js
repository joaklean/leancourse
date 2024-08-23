const IBookRepository = require('../../domain/gateways/book.gateway');
const Book = require('../models/Book');

class BookRepository extends IBookRepository {
    async getAll() {
        return Book.find();
    }

    async create(author) {
        const newBook = new Book(author);
        return newBook.save();
    }
    async getById(id) {
        return Book.findById(id);
    }
    async update(id, updatedBook) {
        return Book.findByIdAndUpdate(id, updatedBook);
    }
    async delete(id) {
        return Book.findByIdAndDelete(id);
    }
}

module.exports = BookRepository;
