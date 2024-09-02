class IUserRepository {
    async register(username, password) {}
    async login(username) {}
    async getById(id) {}
}

module.exports = IUserRepository;