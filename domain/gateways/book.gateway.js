class IBookRepository {
    async getAll() {}
    async create(book) {}
    async getById(id) {}
    async update(id,book) {}
    async delete(id) {}
}

module.exports = IBookRepository;
