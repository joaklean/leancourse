class IAuthorRepository {
    async getAll() {}
    async create(author,token) {}
    async getById(id) {}
    async update(id, author) {}
    async delete(id) {}
}

module.exports = IAuthorRepository;