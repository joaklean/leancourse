const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Redis = require('ioredis');


const secret = process.env.JWT_SECRET || 'leanCourseSecret';
const windowSize = 100000;
const rateLimit = 10;

const redis = new Redis(); // Configure Redis client

const rateLimitMiddleware = async (req, res, next) => {
    const userId = req.userId; // Assuming user ID is in req.user
    const currentTime = Date.now();

    try {
        const key = `rate_limit:${userId}`;
        const [timestamp, requestCount] = await redis.hmget(key, 'timestamp', 'requestCount');

        if (!timestamp) {
            await redis.hmset(key, 'timestamp', currentTime, 'requestCount', 1);
            //await redis.expire(key, windowSize / 1000);
        } else {
            const elapsedTime = currentTime - timestamp;

            if (elapsedTime > windowSize) {
                await redis.hmset(key, 'timestamp', currentTime, 'requestCount', 1);
                //await redis.expire(key, windowSize / 1000);
            } else {
                const newRequestCount = parseInt(requestCount, 10) + 1;

                if (newRequestCount > rateLimit) {
                    return res.status(429).json({ message: 'Too many requests, please try again later' });
                }

                await redis.hincrby(key, 'requestCount', 1);
            }
        }

        next();
    } catch (err) {
        console.error('Redis error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = password === user.password;
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, secret, {
            expiresIn: '1h',
        });
        res.json({message: 'Login successful', token});
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

router.get('/protected', verifyToken, rateLimitMiddleware, (req, res) => {
    res.json({message: 'Welcome to the protected route!'});
});

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({message: 'Invalid token'});
    }
}

module.exports = router;