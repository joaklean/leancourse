const AuthorModel = require('../models/Author');

const AuthorService = {
    getAll: async () => await AuthorModel.find(),
    getById: async (id) => await AuthorModel.findById(id),
    create: (author) => AuthorModel.create(author),
    update: (id, updatedAuthor) => AuthorModel.findByIdAndUpdate(id, updatedAuthor),
    delete: (id) => AuthorModel.findByIdAndDelete(id)
}

module.exports = AuthorService
