import mongoose from 'mongoose';
import app from './app';
import logger from './logger/logger';
import { redisClient } from './helper/redis';
import { config } from './config/config';


mongoose.connect(process.env.CONNECTION_STRING || "", (err) => {
    if (err) {
        logger.error(err.message);
        return;
    }
    if (config.ENABLE_IP_RATE_LIMITING) {
        redisClient.connect()
            .then(() => {
                startServer("Server Started with MongoDB and Redis");
            })
            .catch((CacheErr) => {
                logger.error(CacheErr.message);
            })

    } else {
        startServer("Server Started with MongoDB");
    }
});

function startServer(msg: string) {
    app.listen(process.env.PORT || 3000, () => {
        logger.info(msg);
    });
}
