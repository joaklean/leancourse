const { AuthenticationError } = require('../errors/customErrors');
const JwtAuthService = require('../../services/jwt-auth.service');

const authMiddleware = (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(new AuthenticationError('No token provided'));
        }

        const token = authHeader.split(' ')[1];
        const authService = new JwtAuthService(process.env.JWT_SECRET || 'leanCourseSecret');
        try {
            const decoded = authService.verifyToken(token);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            next(new AuthenticationError('Invalid token'));
        }
};

module.exports = authMiddleware;