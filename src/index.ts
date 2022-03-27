import express from 'express';
import { Request, Response } from "express";

import suggestionsRoute from './routes/suggestions';

const app = express();

app.use('/suggestions', suggestionsRoute);

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to city finder");
});


app.listen(process.env.PORT || 3004, () => {
    console.log("Server is connected");
})