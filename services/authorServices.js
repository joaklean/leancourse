import AuthorModel from '../models/Author';

export const AuthorService = {
    getAll: () => AuthorModel.getAll(),
    getById: (id) => AuthorModel.getById(id),
    create: (author) => AuthorModel.create(author),
    update: (id, updatedAuthor) => AuthorModel.update(id, updatedAuthor),
    delete: (id) => AuthorModel.delete(id)
}
