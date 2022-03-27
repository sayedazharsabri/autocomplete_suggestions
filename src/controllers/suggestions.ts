import { RequestHandler } from "express";
import { IRequest } from '../interface/IRequest';
import { City } from '../models/city';

export const searchCities: RequestHandler = (req, res) => {

    const reqQuery: IRequest = req.query as any;
    const city = new City();
    res.status(200).json({ status: 'success' })
}