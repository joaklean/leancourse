import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'leanCourseSecret';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
