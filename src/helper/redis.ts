import { createClient } from 'redis';

const redisURL = process.env.REDIS_HOST;
const redisClient = createClient({
    url: redisURL
});

export { redisClient };