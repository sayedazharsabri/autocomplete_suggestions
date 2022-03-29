import { RequestHandler } from "express";
import moment from 'moment';
import { validationResult } from "express-validator";
import logger from '../logger/logger';
import { redisClient } from '../helper/redis';
import { config } from '../config/config';
import { CONSTANTS } from '../config/constants';


// Updated Error to handle statusCode and data
declare global {
    interface Error {
        statusCode?: number;
        data: any[]
    }
}


export const validateRequest: RequestHandler = (req, res, next) => {

    try {
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            const err = new Error("Validation failed!");
            err.statusCode = 422;
            err.data = validationError.array();
            throw err;
        }

        next();
    } catch (error: any) {
        error.statusCode = error.statusCode || 500;
        logger.error(JSON.stringify(error));
        res.status(error.statusCode).json({ message: error.message, data: error.data });
    }
}

export const validateIP: RequestHandler = async (req, res, next) => {

    try {

        if (config.ENABLE_IP_RATE_LIMITING) {

            let count: number = 1;
            let timeRemaining: number = CONSTANTS.IP_RATE_LIMITING_TIME_DURATION;
            let toCacheStr: string;
            let toCacheObj: { count: number, time: moment.Moment };

            const ip = req.socket.remoteAddress;
            const strIP = JSON.stringify({ ip });
            const newTime: moment.Moment = moment();

            const objFromCache: { count: any, time: any } = JSON.parse(await redisClient.get(strIP) as any);
            if (!!objFromCache) {
                const countFromCache: number = parseInt(objFromCache.count, 10);
                const oldTime: moment.Moment = moment(objFromCache.time);
                const diff = newTime.diff(oldTime, 'seconds');

                if (!!countFromCache) {
                    if (countFromCache > CONSTANTS.IP_RATE_LIMITING_MAX_ALLOWED_ATTEMPTS && diff < 59) {
                        const err = new Error(`Too many requests, try after ${timeRemaining - diff} seconds`);
                        err.statusCode = 429;
                        throw err;
                    } else {
                        timeRemaining = timeRemaining - diff;
                        count = countFromCache + 1;
                    }
                }
            }

            if (timeRemaining <= 0) {
                await redisClient.del(strIP);
                count = 1;
                toCacheObj = { count, time: newTime };
                timeRemaining = CONSTANTS.IP_RATE_LIMITING_TIME_DURATION;

            } else {
                toCacheObj = { count, time: newTime };
            }
            toCacheStr = JSON.stringify(toCacheObj);
            await redisClient.set(strIP, toCacheStr, { EX: timeRemaining });
        }

        next();
    } catch (error: any) {
        next(error);
    }
}