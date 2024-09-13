const {AuthenticationError} = require('../../application/errors/customErrors');

class UserUseCase {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    async register(username, password) {
        return await this.userRepository.register(username, password);
    }

    async login(username, password) {
        const user = await this.userRepository.login(username);
        if (!user || user.password !== password) {
            throw new AuthenticationError('Authentication failed');
        }
        return this.authService.generateToken({ userId: user._id });
    }

    async getUserById(id) {
        return await this.userRepository.getById(id);
    }
}

module.exports = UserUseCase;