import app from "../../src/app";
import request from "supertest";

describe("Test to suggestions APIs", () => {
    it("GET / should return status 200 with valid message", async () => {
        const result = await request(app).get("/");
        expect(result.text).toEqual("Welcome to city finder");
        expect(result.statusCode).toEqual(200);
    });

});