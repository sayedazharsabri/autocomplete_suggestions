import express from 'express';
import { Request, Response } from "express";

import suggestionsRoute from './routes/suggestions';

const app = express();

app.use('/suggestions', suggestionsRoute);

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Welcome to city finder");
});

export default app;