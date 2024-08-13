import BookModel from '../models/Book';

export const BookService = {
    getAll: () => BookModel.getAll(),
    getById: (id) => BookModel.getById(id),
    create: (book) => BookModel.create(book),
    update: (id, updatedBook) => BookModel.update(id, updatedBook),
    delete: (id) => BookModel.delete(id)
};
