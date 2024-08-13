import jwt from 'jsonwebtoken';
import { UserService } from '../services/userServices';

const secret = process.env.JWT_SECRET || 'leanCourseSecret';

export const UserController = {
    register: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await UserService.register(username, password);
            res.status(201).json({ message: 'User registered', user });
        } catch (error) {
            res.status(500).json({ error: 'Registration failed' });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await UserService.login(username);
            if (!user || user.password !== password) {
                return res.status(401).json({ error: 'Authentication failed' });
            }
            const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ error: 'Login failed' });
        }
    },
    protected: (req, res) => {
        res.json({ message: 'Welcome to the protected route!' });
    }
};
