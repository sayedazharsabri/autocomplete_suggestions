import { RequestHandler } from "express";
import { IRequest, Sort } from '../interface/IRequest';
import { GeoNear } from '../interface/IMongodb';
import { City } from '../models/city';

/**
 * Below function is to search cities for provided request query
 *
 */
export const searchCities: RequestHandler = async (req, res) => {

    try {
        const reqQuery: IRequest = req.query as any;
        const q: string = reqQuery.q;
        const longitude: number = parseFloat(reqQuery.longitude);
        const latitude: number = parseFloat(reqQuery.latitude);

        let sort: Sort = 'distance';
        if (!!reqQuery.sort) {
            sort = reqQuery.sort;
        }

        // Regular expression to match partial or complete name
        const regex = new RegExp(`^${q}`, "i");

        const geoNear: GeoNear = {
            near: { type: "Point", coordinates: [longitude, latitude] },
            distanceField: "distance"
        }

        // If radius is in query, then below filter will work
        if (!!reqQuery.radius) {
            // Converting radius into meters
            const radius: number = parseFloat(reqQuery.radius) * 1000;
            geoNear.maxDistance = radius;
        }

        const result = await City.aggregate(
            [
                { $geoNear: geoNear },
                { $addFields: { results: { $regexMatch: { input: "$name", regex } } } },
                // In future we can replace above line by below line to check matching for ascii and alt_name also
                // { $addFields: { results: { $or :[{$regexMatch: { input: "$name", regex }}, {$regexMatch: { input: "$ascii", regex }}, {$regexMatch: { input: "$alt_name", regex }}] } } },
                { $match: { results: true } },
                { $sort: { [sort]: 1 } },
                {
                    $project:
                    {
                        _id: 0, name: 1, distance: { $round: [{ $divide: ["$distance", 1000] }, 2] },
                        latitude: { $arrayElemAt: ["$location.coordinates", 1] },
                        longitude: { $arrayElemAt: ["$location.coordinates", 0] }
                    }
                }
            ]
        )
        res.status(200).json({ suggestions: result });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}