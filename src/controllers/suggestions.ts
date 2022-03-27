import { RequestHandler } from "express";
import { IRequest } from '../interface/IRequest';

export const searchCities: RequestHandler = (req, res) => {

    const reqQuery: IRequest = req.query as any;
    console.log(reqQuery);

    res.status(200).json({ status: 'success' })
}