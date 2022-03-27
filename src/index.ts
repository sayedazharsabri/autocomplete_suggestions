import express from 'express';
import mongoose from 'mongoose';
import { Request, Response } from "express";

import suggestionsRoute from './routes/suggestions';

const app = express();

app.use('/suggestions', suggestionsRoute);

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to city finder");
});

mongoose.connect(process.env.CONNECTION_STRING || "", (err) => {
    if (err) {
        return;
    }
    app.listen(process.env.PORT || 3000);
});

