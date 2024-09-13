class BookUseCase {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    async createBook(data) {
        return await this.bookRepository.create(data);
    }

    async getAllBooks() {
        return await this.bookRepository.getAll();
    }

    async getBookById(id) {
        return await this.bookRepository.getById(id);
    }

    async updateBook(id, data) {
        return await this.bookRepository.update(id, data);
    }

    async deleteBook(id) {
        return await this.bookRepository.delete(id);
    }
}

module.exports = BookUseCase;
