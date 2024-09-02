const JwtAuthService = require('../services/jwt-auth.service');
const UserUseCase = require('../../domain/usecases/user.usecase');
const MongoUserRepository = require('../repositories/mongo-user.repository');

const userUseCase = new UserUseCase(new MongoUserRepository(), new JwtAuthService(process.env.JWT_SECRET || 'leanCourseSecret'));

const UserController = {

    register: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await userUseCase.register(username, password);
            res.status(201).json({ message: 'User registered', user });
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const token = await userUseCase.login(username, password);

            res.json({ message: 'Login successful', token });
        } catch (error) {
            next(error);
        }
    },

    protected: (req, res) => {
        res.json({ message: 'Welcome to the protected route!' });
    }
}

module.exports = UserController;