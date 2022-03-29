import winston from 'winston';
import path from 'path';
import moment from 'moment';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    defaultMeta: { service: 'suggestions' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `log/error_YYYYMMDD.log`
        // - Write all logs with importance level of `info` or less to `log/combined_YYYYMMDD.log`
        //
        new winston.transports.File({ filename: path.join(__dirname, '..', '..', 'log', 'error_' + moment().format('YYYYMMDD') + '.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(__dirname, '..', '..', 'log', 'combined_' + moment().format('YYYYMMDD') + '.log') }),
    ],
});

// If we are in development only then it will transport data to console
if (process.env.NODE_ENV === 'development') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

export default logger;