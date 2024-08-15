const BookModel = require('../models/Book');

const BookService = {
    getAll: () => BookModel.find(),
    getById: (id) => BookModel.findById(id),
    create: (book) => BookModel.create(book),
    update: (id, updatedBook) => BookModel.findByIdAndUpdate(id, updatedBook),
    delete: (id) => BookModel.findByIdAndDelete(id)
};

module.exports = BookService