import express from 'express';
import { Request, Response } from "express";
const app = express();

app.get("/", (req:Request, res:Response) => {
    res.send("Soon we will start this functionality");
});

app.listen(process.env.PORT || 3004, () => {
    console.log("Server is connected");
} )