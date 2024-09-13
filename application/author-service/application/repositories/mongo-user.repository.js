const IUserRepository = require('../../domain/interfaces/userRepository.interface');
const User = require('../application/models/mongo/User-mongo-model'); // Adjust the path if needed

class MongoUserRepository extends IUserRepository {
    async register(username, password) {
        const user = new User({username, password});
        return await user.save();
    }

    async login(username) {
        return await User.findOne({username});
    }

    async getById(id) {
        return await User.findById(id);
    }
}

module.exports = MongoUserRepository;