const IBookRepository = require('../../domain/interfaces/bookRepository.interface');
const Book = require('../models/mongo/Book-mongo.model'); // Adjust the path if needed

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
}

module.exports = MongoBookRepository;
