const UserService = require('../repositories/mongo-user.repository');
const { AuthenticationError } = require('../errors/customErrors');
const JwtAuthService = require('../repositories/jwt-auth.service');

const UserController = {

    register: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await UserService.register(username, password);
            res.status(201).json({ message: 'User registered', user });
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await UserService.login(username);

            if (!user || user.password !== password) {
                throw new AuthenticationError('Authentication failed');
            }

            const authService = new JwtAuthService(process.env.JWT_SECRET || 'leanCourseSecret');
            const token = authService.generateToken({ userId: user._id });

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