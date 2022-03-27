import { RequestHandler } from "express";
import { IRequest } from '../interface/IRequest';
import { City } from '../models/city';

export const searchCities: RequestHandler = async (req, res) => {

    try {
        const reqQuery: IRequest = req.query as any;
        const q: string = reqQuery.q;
        const longitude: number = parseFloat(reqQuery.longitude);
        const latitude: number = parseFloat(reqQuery.latitude);

        let radius: number;
        if (!!reqQuery.radius) {
            // Converting radius into meters
            radius = parseFloat(reqQuery.radius) * 1000;
        }

        let sort: string;
        if (!!reqQuery.sort) {
            sort = reqQuery.sort;
        }

        // Regular expression to match partial or complete name
        const regex = new RegExp(`^${q}`);

        const result = await City.aggregate(
            [
                {
                    $geoNear: {
                        near: { type: "Point", coordinates: [longitude, latitude] },
                        distanceField: "distance"
                    }
                },
                { $addFields: { results: { $regexMatch: { input: "$name", regex } } } },
                { $match: { results: true } }
            ]
        )

        res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}