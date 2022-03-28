import { Request, Response, NextFunction } from "express";
import { searchCities } from '../../src/controllers/suggestions';
import { IRequest } from '../../src/interface/IRequest';
import { City } from '../../src/models/city';
import cityData from '../mockdata/cities.json'

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

const mockResponseFn = () => {
    const res = { statusCode: 0, responseObject: {}, status() { }, json() { } };

    res.status = jest.fn().mockImplementation(code => {
        res.statusCode = code;
        return res;
    })

    res.json = jest.fn().mockImplementation(result => {
        res.responseObject = result;
        return res;
    })
    return res;
};

const mockRequestQueryData: IRequest = {
    q: "Acton",
    latitude: "34.46999",
    longitude: "-122.25257",
    radius: "2",
    sort: 'distance'
};

describe("Suggestions controller to search city", () => {

    beforeEach(() => {
        mockRequest = { query: { ...mockRequestQueryData } };
        mockResponse = mockResponseFn() as any;


    });

    it("Should have a searchCities function", () => {
        expect(typeof searchCities).toBe("function");
    });

    it("Should return 200 with response data on success", async () => {
        City.aggregate = jest.fn(() => Promise.resolve(cityData) as any);
        mockRequest.query = {
            q: "string",
            latitude: "string",
            longitude: "string",
            radius: "2",
            sort: 'distance'
        }
        await searchCities(mockRequest as Request, mockResponse as Response, {} as NextFunction);
        let responseObject = (mockResponse as any).responseObject;
        expect(mockResponse.statusCode).toBe(200);
        expect(responseObject.suggestions).toBe(cityData);
    });

    it("Should return 500 and failure message on failure", async () => {
        const message = "failed in fetching data";
        City.aggregate = jest.fn(() => Promise.reject({message:"failed in fetching data"}) as any);
        await searchCities(mockRequest as Request, mockResponse as Response, {} as NextFunction);
        let responseObject = (mockResponse as any).responseObject;
        expect(mockResponse.statusCode).toBe(500);
        expect(responseObject.message).toBe(message);
    });
})
