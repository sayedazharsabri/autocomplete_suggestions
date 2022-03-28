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
});