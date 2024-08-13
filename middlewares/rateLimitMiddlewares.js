import Redis from 'ioredis';

const redis = new Redis();
const windowSize = 100000;
const rateLimit = 10;

export const rateLimitMiddleware = async (req, res, next) => {
    const userId = req.userId; // Assuming user ID is in req.user
    const currentTime = Date.now();

    try {
        const key = `rate_limit:${userId}`;
        const [timestamp, requestCount] = await redis.hmget(key, 'timestamp', 'requestCount');

        if (!timestamp) {
            await redis.hmset(key, 'timestamp', currentTime.toString(), 'requestCount', '1');
        } else {
            const elapsedTime = currentTime - parseInt(timestamp, 10);

            if (elapsedTime > windowSize) {
                await redis.hmset(key, 'timestamp', currentTime.toString(), 'requestCount', '1');
            } else {
                const newRequestCount = parseInt(requestCount || '0', 10) + 1;

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
