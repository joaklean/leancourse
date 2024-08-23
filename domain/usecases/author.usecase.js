class AuthorUseCase {
    constructor(authorRepository) {
        this.authorRepository = authorRepository;
    }

    async createAuthor(data) {
        return this.authorRepository.create(data);
    }

    async getAllAuthors() {
        return this.authorRepository.getAll();
    }

    async getAuthorById(id) {
        return this.authorRepository.getById(id);
    }

    async updateAuthor(id, data) {
        return this.authorRepository.update(id, data);
    }

    async deleteAuthor(id) {
        return his.authorRepository.delete(id);
    }
}

module.exports = AuthorUseCase;
