import express from 'express';
import { Request, Response, NextFunction } from "express";

import { validateIP } from './helper/validateRequest'
import logger from './logger/logger';
import suggestionsRoute from './routes/suggestions';

const app = express();

app.use(validateIP);
app.use('/suggestions', suggestionsRoute);

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Welcome to city finder");
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {

    error.statusCode = error.statusCode || 500;
    const response: { message: string, data?: any[] } = { message: "Something went wrong please try later." };

    logger.error(JSON.stringify({ message: error.message, statusCode: error.statusCode, error }));

    if (!!error.message) {
        response.message = error.message;
    }
    if (!!error.data && error.statusCode !== 500) {
        response.data = error.data;
    }

    res.status(error.statusCode).json(response);
});

export default app;