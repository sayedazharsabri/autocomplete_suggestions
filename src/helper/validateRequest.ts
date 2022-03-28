import { RequestHandler } from "express";
import { validationResult } from "express-validator";

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
        res.status(error.statusCode).json({ message: error.message, data: error.data });
    }
}