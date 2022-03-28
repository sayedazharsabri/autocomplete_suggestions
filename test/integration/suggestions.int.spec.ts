import app from "../../src/app";
import request from "supertest";

import { City } from '../../src/models/city';
import cityData from '../mockdata/cities.json'
import console from "console";

describe("Test to suggestions APIs", () => {
    it("GET / should return status 200 with valid message", async () => {
        const result = await request(app).get("/");
        expect(result.text).toEqual("Welcome to city finder");
        expect(result.statusCode).toEqual(200);
    });

    it("should return status 200 with data GET /suggestions with query parameters", async () => {
        const apiWithQuery = "/suggestions?q=Acton&latitude=34.46999&longitude=-122.25257&radius=393116.845&sort=distance";
        City.aggregate = jest.fn(() => Promise.resolve(cityData) as any);
        const result = await request(app).get(apiWithQuery);
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.text).suggestions).toStrictEqual(cityData);
    });

    it("should return status 422 with valdation failed message if required query parameter 'q' is missing", async () => {
        const apiWithQueryWithMissing_q = "/suggestions?=Acton&latitude=34.46999&longitude=-122.25257&radius=393116.845&sort=distance";
        const result = await request(app).get(apiWithQueryWithMissing_q);
        expect(result.statusCode).toEqual(422);
        expect(JSON.parse(result.text).message).toBe("Validation failed!");
    });

    it("should return status 422 with valdation failed message if required query parameter 'latitude' is missing", async () => {
        const apiWithQueryWithMissing_latitude = "/suggestions?q=Acton&longitude=-122.25257&radius=393116.845&sort=distance";
        const result = await request(app).get(apiWithQueryWithMissing_latitude);
        expect(result.statusCode).toEqual(422);
        expect(JSON.parse(result.text).message).toBe("Validation failed!");
    });

    it("should return status 422 with valdation failed message if required query parameter 'longitude' is missing", async () => {
        const apiWithQueryWithMissing_longitude = "/suggestions?q=Acton&latitude=34.46999&radius=393116.845&sort=distance";
        const result = await request(app).get(apiWithQueryWithMissing_longitude);
        expect(result.statusCode).toEqual(422);
        expect(JSON.parse(result.text).message).toBe("Validation failed!");
    });
});