import { RequestHandler } from "express";
import { IRequest } from '../interface/IRequest';
import { GeoNear } from '../interface/IMongodb';
import { City } from '../models/city';

export const searchCities: RequestHandler = async (req, res) => {

    try {
        const reqQuery: IRequest = req.query as any;
        const q: string = reqQuery.q;
        const longitude: number = parseFloat(reqQuery.longitude);
        const latitude: number = parseFloat(reqQuery.latitude);

        let sort: string;
        if (!!reqQuery.sort) {
            sort = reqQuery.sort;
        }


        // Regular expression to match partial or complete name
        const regex = new RegExp(`^${q}`);

        let geoNear: GeoNear = {
            near: { type: "Point", coordinates: [longitude, latitude] },
            distanceField: "distance"
        }

        if (!!reqQuery.radius) {
            // Converting radius into meters
            const radius:number = parseFloat(reqQuery.radius) * 1000;
            geoNear['maxDistance'] = radius;
        }

        const result = await City.aggregate(
            [
                { $geoNear: geoNear },
                { $addFields: { results: { $regexMatch: { input: "$name", regex } } } },
                { $match: { results: true } }
            ]
        )

        res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}