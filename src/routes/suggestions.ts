import express from 'express';
import { searchCities } from '../controllers/suggestions';
import { validateRequest } from '../helper/validateRequest';
import { query } from 'express-validator/check';

const router: express.Router = express.Router();

router.get('/', [
    query('q')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Please enter some partial or full name to get city"),
    query('latitude')
        .not()
        .isEmpty()
        .withMessage("Please enter latitude")
        .custom((lat: string) => {
            const parsedLatitude: number = parseFloat(lat);
            if (isNaN(parsedLatitude)) {
                return Promise.reject("Latitude should be numeric.");
            }
            if (parsedLatitude > 90 || parsedLatitude < -90) {
                return Promise.reject("Latitude should be between -90 to +90");
            }
            return true;

        }),
    query('longitude')
        .not()
        .isEmpty()
        .withMessage("Please enter longitude")
        .custom((long: string) => {
            const parsedLongitude: number = parseFloat(long);
            if (isNaN(parsedLongitude)) {
                return Promise.reject("Longitude should be numeric.");
            }
            if (parsedLongitude > 180 || parsedLongitude < -180) {
                return Promise.reject("Longitude should be between -180 to +180");
            }
            return true;

        }),
    query('radius')
        .custom((value: string) => {
            if (!value) {
                return true;
            }
            const parsedRadious = parseFloat(value);
            if (isNaN(parsedRadious)) {
                return Promise.reject("Radius should be numeric.");
            }
            return true;

        }),
    query('sort')
        .custom((value: string) => {
            if (!value) {
                return true;
            }
            const allowedSortFor = ['distance', 'name'];
            if (allowedSortFor.indexOf(value) > -1) {
                return true;
            }
            return Promise.reject("Sorting is only allowed by name or distance.");

        })
], validateRequest, searchCities);

export default router;